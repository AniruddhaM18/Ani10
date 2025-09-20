import { type Request, type Response } from 'express';
import { type Workflow, type Action } from '../types';
import { getWorkflowById } from '../services/workflowService';
import { getCredentialByKey } from '../services/credentialService';
import { sendEmail, sendResendEmail, sendTelegramMessage } from '../services/notificationService';

const webhookController = {
  handle: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Workflow ID is required' });
    }

    const workflow = getWorkflowById(id);
    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    // Ensure userId exists
    if (!workflow.userId) {
      return res.status(400).json({ error: 'Workflow is missing userId' });
    }

    // Ensure actions exist and is an array
    const actions = workflow.actions || [];
    for (const action of actions) {
      switch (action.type) {
        case 'email': {
          const emailConfig = action.config;
          const emailCred = getCredentialByKey('email', workflow.userId); // ✅ Now safe
          if (!emailCred) {
            console.warn('Email credential not found for user:', workflow.userId);
            continue;
          }

          const { to, subject, body } = emailConfig;

          // Validate required fields
          if (!to || !subject || !body) {
            console.warn('Missing email config fields:', { to, subject, body });
            continue;
          }

          if (emailCred.value.includes('resend')) {
            await sendResendEmail(to, subject, body);
          } else {
            await sendEmail(to, subject, body);
          }
          break;
        }

        case 'telegram': {
          const telegramConfig = action.config;
          const telegramCred = getCredentialByKey('telegram', workflow.userId); 
          if (!telegramCred) {
            console.warn('Telegram credential not found for user:', workflow.userId);
            continue;
          }

          const { chatId, message } = telegramConfig;

          // Validate required fields
          if (!chatId || !message) {
            console.warn('Missing telegram config fields:', { chatId, message });
            continue;
          }

          await sendTelegramMessage(chatId, message);
          break;
        }

        default:
          console.warn('Unknown action type:', action.type);
      }
    }

    res.status(200).json({ message: 'Workflow executed successfully' });
  },
};

export default webhookController;