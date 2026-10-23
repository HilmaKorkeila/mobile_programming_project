import { z } from 'zod';

// Expense Schema
export const expenseSchema = z.object({
  id: z.string().min(1, 'Expense id is required'),
  projectId: z.uuid({ message: 'projectId must be a valid UUID' }),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot exceed 50 characters'),
  amount: z.number().default(0),
  createdAt: z.number({ required_error: 'createdAt is required' }),
});

// Task Schema
export const taskSchema = z.object({
  id: z.string().min(1, 'Task id is required'),
  projectId: z.uuid({ message: 'projectId must be a valid UUID' }),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot exceed 50 characters'),
  createdAt: z.number({ required_error: 'createdAt is required' }),
  status: z.string().default('Not complete'),
});

// GET /sync/projects/:id validation
export const getProjectSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'Project id in URL parameter must be a valid UUID' }),
  }),
});

// PUT /sync/projects/:id validation
export const upsertProjectSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'Project id in URL parameter must be a valid UUID' }),
  }),
  body: z.object({
    id: z.uuid({ message: 'Project id must be a valid UUID' }),
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, 'Name cannot exceed 50 characters'),
    description: z
      .string()
      .max(200, 'Description cannot exceed 200 characters'),
    budget: z.number().default(0),
    is_favourite: z.boolean().default(false),
    createdAt: z.number({ required_error: 'createdAt is required' }),
    expenses: z.array(expenseSchema).default([]),
    tasks: z.array(taskSchema).default([]),
  }),
});

// DELETE /sync/projects/:id validation
export const deleteProjectSchema = z.object({
  params: z.object({
    id: z.uuid({ message: 'Project id in URL parameter must be a valid UUID' }),
  }),
});
