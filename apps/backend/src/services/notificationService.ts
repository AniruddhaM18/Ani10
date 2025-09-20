import { env } from '../config/env';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import axios from 'axios';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      to,
      subject,
      html,
    });
    console.log('✅ Email sent via Gmail');
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
};

export const sendResendEmail = async (to: string, subject: string, html: string) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.com',
      to,
      subject,
      html,
    });
    console.log('✅ Email sent via Resend');
  } catch (err) {
    console.error('❌ Failed to send via Resend:', err);
  }
};

export const sendTelegramMessage = async (chatId: string, text: string) => {
  try {
    await axios.post(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text,
      }
    );
    console.log('✅ Telegram message sent');
  } catch (err) {
    console.error('❌ Failed to send Telegram message:', err);
  }
};