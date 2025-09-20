import { type Request, type Response } from 'express';
import {
  findUserByEmail,
  createUser,
  comparePasswords,
  generateToken,
} from '../services/authService.js';

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const user = await createUser(email, password);
  const token = generateToken(user.id);

  res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user || !(await comparePasswords(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user.id);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
};