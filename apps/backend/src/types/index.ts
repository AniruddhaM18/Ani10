export interface User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
  }
  
  export interface Workflow {
    id: string;
    name: string;
    triggers?: Trigger[];
    actions?: Action[];
    userId?: string;
    createdAt: Date;
  }
  
  export type TriggerType = 'manual' | 'webhook';
  export interface Trigger {
    type: TriggerType;
    config?: Record<string, any>;
  }
  
  export type ActionType = 'email' | 'telegram';
  export interface Action {
    type: ActionType;
    config: Record<string, any>;
  }
  
  export interface Credential {
    id: string;
    key: string; // e.g., 'email', 'telegram'
    value: string; // e.g., API key or token
    userId: string;
  }

  import { type Request } from 'express';

  declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }

  export interface AuthenticatedRequest extends Request {
    userId: string; // required!
  }