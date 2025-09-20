import express from 'express';
import workflowController from '../controllers/workflowController';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/', authMiddleware, workflowController.create);
router.get('/', authMiddleware, workflowController.getAll);
router.get('/:id', authMiddleware, workflowController.getById);
router.put('/:id', authMiddleware, workflowController.update);

export default router;