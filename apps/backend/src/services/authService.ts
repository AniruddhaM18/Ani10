// src/services/authService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { type User } from '../types/index.js';
import { env } from '../config/env.js';

// In-memory "database" — will be replaced with Prisma/DB later
let users: User[] = [];

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const createUser = async (email: string, password: string): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };

  users.push(newUser);
  return newUser;
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

// Optional: For debugging or admin purposes

export const getAllUsers = (): User[] => users;