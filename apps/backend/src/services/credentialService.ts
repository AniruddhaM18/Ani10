import type { Credential } from "../types";

let credentials: Credential[] = [];

export const createCredential = (data: Omit<Credential, 'id'>): Credential => {
  const credential: Credential = {
    ...data,
    id: crypto.randomUUID(),
  };
  credentials.push(credential);
  return credential;
};

export const deleteCredential = (id: string): boolean => {
  const idx = credentials.findIndex(c => c.id === id);
  if (idx === -1) return false;
  credentials.splice(idx, 1);
  return true;
};

export const getCredentialByKey = (key: string, userId: string): Credential | null => {
  return credentials.find(c => c.key === key && c.userId === userId) || null;
};