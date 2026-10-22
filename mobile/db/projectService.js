import * as Crypto from 'expo-crypto';
import { eq, ne, not } from 'drizzle-orm';
import { db } from './index';
import { projects, expenses, tasks } from './schema';

export async function insertProjectToDb(name, description) {
  await db.insert(projects).values({
    id: Crypto.randomUUID(),
    name: name,
    description: description,
    createdAt: Date.now(),
  });
}

export async function toggleProjectFavouriteInDb(projectId) {
  // Remove favorite status from all other projects
  await db
    .update(projects)
    .set({ is_favourite: false })
    .where(ne(projects.id, projectId));

  // Toggle is_favourite status from selected project
  await db
    .update(projects)
    .set({ is_favourite: not(projects.is_favourite) })
    .where(eq(projects.id, projectId));
}

export async function deleteProjectFromDb(projectId) {
  await db.delete(projects).where(eq(projects.id, projectId));
}

// ...() is called a conditional spread pattern
// budget field updates to 0 or given value, whichever is greater to prevent negative values
export async function updateProjectInDb(projectId, updatedFields) {
  await db
    .update(projects)
    .set({
      ...(updatedFields.budget !== undefined && {
        budget: Math.max(parseInt(updatedFields.budget, 10), 0),
      }),
    })
    .where(eq(projects.id, projectId));
}

export async function insertExpenseToDb(projectId, name, amount) {
  await db.insert(expenses).values({
    id: Crypto.randomUUID(),
    projectId,
    name,
    amount: parseInt(amount, 10) || 0,
    createdAt: Date.now(),
  });
}

// ...() is called a conditional spread pattern
export async function updateExpenseInDb(expenseId, updatedFields) {
  await db
    .update(expenses)
    .set({
      ...(updatedFields.name && { name: updatedFields.name }),
      ...(updatedFields.amount !== undefined && {
        amount: parseInt(updatedFields.amount, 10),
      }),
    })
    .where(eq(expenses.id, expenseId));
}

export async function deleteExpenseFromDb(expenseId) {
  if (!expenseId) return;
  await db.delete(expenses).where(eq(expenses.id, expenseId));
}

export async function insertTaskToDb(projectId, name) {
  await db.insert(tasks).values({
    id: Crypto.randomUUID(),
    projectId: projectId,
    name,
    createdAt: Date.now(),
  });
}

// ...() is called a conditional spread pattern
export async function updateTaskInDb(taskId, updatedFields) {
  await db
    .update(tasks)
    .set({
      ...(updatedFields.name && { name: updatedFields.name }),
      ...(updatedFields.status && { status: updatedFields.status }),
    })
    .where(eq(tasks.id, taskId));
}

export async function deleteTaskFromDb(taskId) {
  if (!taskId) return;
  await db.delete(tasks).where(eq(tasks.id, taskId));
}
