import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Project
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name', { length: 50 }).notNull(),
  description: text('description', { length: 200 }).notNull(),
  budget: integer('budget').default(0).notNull(),
  is_favourite: integer('is_favourite', { mode: 'boolean' })
    .default(false)
    .notNull(),
  createdAt: integer('created_at')
    .notNull()
    .$defaultFn(() => Date.now()), // Sets createdAt to Date.now() on creation
});

// Projects pending cloud sync
export const dirtyProjects = sqliteTable('dirty_projects', {
  projectId: text('projects_id').primaryKey(),
  action: text('action').notNull().default('upsert'), // 'upsert' | 'delete'
  updatedAt: integer('updated_at')
    .notNull()
    .$defaultFn(() => Date.now())
    .$onUpdate(() => Date.now()),
});

// Expenses. If parent project is deleted, expense is automatically deleted
export const expenses = sqliteTable('expenses', {
  id: text('id').primaryKey(),
  projectId: text('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name', { length: 50 }).notNull(),
  amount: integer('budget').default(0).notNull(),
  createdAt: integer('created_at').notNull(),
});

// Tasks. If parent project is deleted, task is automatically deleted
export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  projectId: text('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name', { length: 50 }).notNull(),
  createdAt: integer('created_at').notNull(),
  status: text('status').default('Not complete').notNull(),
});
