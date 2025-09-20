import '../types'
import { type Request, type Response } from 'express';
import { createCredential, deleteCredential, getCredentialByKey } from '../services/credentialService';
import { authMiddleware } from '../middlewares/authMiddleware';
import type { AuthenticatedRequest } from '../types/index'; // Import this

const credentialController = {
  create: async (req: Request, res: Response) => { 
    const { key, value } = req.body;
    if (!key || !value) {
      return res.status(400).json({ error: 'Key and value required' });
    }
    const authReq = req as AuthenticatedRequest;
    const credential = createCredential({
      key,
      value,
      userId: authReq.userId,
    });

    res.status(201).json(credential);
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (deleteCredential(id!)) {
      res.status(200).json({ message: 'Credential deleted' });
    } else {
      res.status(404).json({ error: 'Credential not found' });
    }
  },
};

export default credentialController;