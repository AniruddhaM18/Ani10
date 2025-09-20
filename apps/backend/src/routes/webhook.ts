import express from 'express';
import webhookController from '../controllers/webhookController';

const router = express.Router();

router.post('/handler/:id', webhookController.handle);

export default router;