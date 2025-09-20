import type { Workflow, Trigger, Action } from '../types';

let workflows: Workflow[] = [];

export const createWorkflow = (data: Omit<Workflow, 'id' | 'createdAt'>): Workflow => {
  const workflow: Workflow = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };
  workflows.push(workflow);
  return workflow;
};

export const getWorkflows = (): Workflow[] => workflows;

export const getWorkflowById = (id: string): Workflow | undefined =>
  workflows.find(w => w.id === id);

export const updateWorkflow = (id: string, data: Partial<Workflow>): Workflow | undefined => {
  const idx = workflows.findIndex(w => w.id === id);
  if (idx === -1) return undefined; // fixed: was null
  workflows[idx] = { ...workflows[idx], ...data } as Workflow; 
  return workflows[idx];
};