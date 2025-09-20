import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import authRoutes from './routes/auth';
import workflowRoutes from './routes/workflow';
import credentialRoutes from './routes/credential';
import webhookRoutes from './routes/webhook';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/workflow', workflowRoutes);
app.use('/api/credential', credentialRoutes);
app.use('/webhook', webhookRoutes);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});

export default app;
