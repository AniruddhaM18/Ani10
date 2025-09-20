import express from 'express';
import credentialController from '../controllers/credentialController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, credentialController.create);
router.delete('/:id', authMiddleware, credentialController.delete);

export default router;