import { type Request, type Response } from 'express';
import type { Workflow } from '../types';
import { createWorkflow, getWorkflows, getWorkflowById, updateWorkflow } from '../services/workflowService';
import { authMiddleware } from '../middlewares/authMiddleware';

const workflowController = {
  create: async (req: Request, res: Response) => {
    const { name, triggers, actions, userId } = req.body;
    if (!name || !triggers || !actions || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const workflow = createWorkflow({ name, triggers, actions, userId });
    res.status(201).json(workflow);
  },

  getAll: async (req: Request, res: Response) => {
    const workflows = getWorkflows();
    res.json(workflows);
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const workflow = getWorkflowById(id!);
    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });
    res.json(workflow);
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, triggers, actions } = req.body;
    const updated = updateWorkflow(id!, { name, triggers, actions });
    if (!updated) return res.status(404).json({ error: 'Workflow not found' });
    res.json(updated);
  },
};

export default workflowController;