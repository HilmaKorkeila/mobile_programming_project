import * as Crypto from 'expo-crypto';
import { eq, ne, not, and } from 'drizzle-orm';
import { db } from './index';
import { projects, expenses, tasks, dirtyProjects } from './schema';
import { syncPendingProjects } from './syncService';
import { sql } from 'drizzle-orm';

// Mark given array of projects
// TODO: Use transactions with db edits
async function markProjectsDirty(projectRows) {
  // Return if given empty array
  if (!projectRows || projectRows.length === 0) {
    return;
  }

  console.log('=== PROJECT ROWS ===');
  console.log(projectRows);

  // Select only 'projectId' and 'action' fields from rows. if no 'action' field exists, add one with default value of 'upsert'
  const cleanProjectRows = projectRows.map(({ projectId, action }) => ({
    projectId,
    action: action ?? 'upsert',
  }));

  console.log('=== CLEAN ROWS ===');
  console.log(projectRows);

  const updatedRows = await db
    .insert(dirtyProjects)
    .values(cleanProjectRows)
    .onConflictDoUpdate({
      target: dirtyProjects.projectId,
      set: {
        action: sql`excluded.action`,
      },
      // Only update if action value changed
      // where: sql`${dirtyProjects.action} IS NOT excluded.action`,
    })
    .returning({
      projectId: dirtyProjects.projectId,
      action: dirtyProjects.action,
    });

  console.log('=== UPDATED ROWS ===');
  console.log(updatedRows);

  // Attempt cloud sync if any rows changed
  if (updatedRows.length > 0) {
    syncPendingProjects();
  }
}

export async function insertProjectToDb(name, description) {
  const rows = await db
    .insert(projects)
    .values({
      id: Crypto.randomUUID(),
      name: name,
      description: description,
    })
    .returning({ projectId: projects.id });

  // Mark project dirty
  await markProjectsDirty(rows);
}

// Toggle project is_favourite-status, while toggling off is_favourite from other projects
export async function toggleProjectFavouriteInDb(projectId) {
  // Remove favorite status from all projects which are not 'projectId' and are favourites
  const nonFavouriteRows = await db
    .update(projects)
    .set({ is_favourite: false })
    .where(and(ne(projects.id, projectId), eq(projects.is_favourite, true)))
    .returning({ projectId: projects.id });

  // Toggle is_favourite status from selected project
  const favouriteRows = await db
    .update(projects)
    .set({
      is_favourite: not(projects.is_favourite),
      syncStatus: 'pending_upsert',
    })
    .where(eq(projects.id, projectId))
    .returning({ projectId: projects.id });

  // Mark all changed projects dirty
  await markProjectsDirty([...nonFavouriteRows, ...favouriteRows]);
}

export async function deleteProjectFromDb(projectId) {
  const deletedRows = await db
    .delete(projects)
    .where(eq(projects.id, projectId))
    .returning({ projectId: projects.id });

  // Add deletion action to rows
  const filledRows = deletedRows.map((row) => ({
    projectId: row.projectId,
    action: 'delete',
  }));

  await markProjectsDirty(filledRows);
}

// ...() is called a conditional spread pattern
// budget field updates to 0 or given value, whichever is greater to prevent negative values
export async function updateProjectInDb(projectId, updatedFields) {
  const updatedRows = await db
    .update(projects)
    .set({
      ...(updatedFields.budget !== undefined && {
        budget: Math.max(parseInt(updatedFields.budget, 10), 0),
      }),
    })
    .where(eq(projects.id, projectId))
    .returning({ projectId: projects.id });

  // Mark project dirty
  await markProjectsDirty(updatedRows);
}

export async function insertExpenseToDb(projectId, name, amount) {
  await db.insert(expenses).values({
    id: Crypto.randomUUID(),
    projectId,
    name,
    amount: parseInt(amount, 10) || 0,
    createdAt: Date.now(),
  });

  // Mark project associated with expense dirty
  await markProjectsDirty([{ projectId }]);
}

// ...() is called a conditional spread pattern
export async function updateExpenseInDb(expenseId, updatedFields) {
  const updatedRows = await db
    .update(expenses)
    .set({
      ...(updatedFields.name && { name: updatedFields.name }),
      ...(updatedFields.amount !== undefined && {
        amount: parseInt(updatedFields.amount, 10),
      }),
    })
    .where(eq(expenses.id, expenseId))
    .returning({ projectId: expenses.projectId });

  // Mark project associated with expense dirty
  await markProjectsDirty(updatedRows);
}

export async function deleteExpenseFromDb(expenseId) {
  if (!expenseId) return;
  const deletedRows = await db
    .delete(expenses)
    .where(eq(expenses.id, expenseId))
    .returning({ projectId: expenses.projectId });

  // Add deletion action to rows
  const filledRows = deletedRows.map((row) => ({
    projectId: row.projectId,
    action: 'delete',
  }));

  // Mark project associated with expense dirty
  await markProjectsDirty(filledRows);
}

export async function insertTaskToDb(projectId, name) {
  await db.insert(tasks).values({
    id: Crypto.randomUUID(),
    projectId: projectId,
    name,
    createdAt: Date.now(),
  });

  // Mark project associated with task dirty
  await markProjectsDirty([{ projectId }]);
}

// ...() is called a conditional spread pattern
export async function updateTaskInDb(taskId, updatedFields) {
  const updatedRows = await db
    .update(tasks)
    .set({
      ...(updatedFields.name && { name: updatedFields.name }),
      ...(updatedFields.status && { status: updatedFields.status }),
    })
    .where(eq(tasks.id, taskId))
    .returning({ projectId: tasks.projectId });

  // Mark project associated with task dirty
  await markProjectsDirty(updatedRows);
}

export async function deleteTaskFromDb(taskId) {
  if (!taskId) return;
  const deletedRows = await db
    .delete(tasks)
    .where(eq(tasks.id, taskId))
    .returning({ projectId: tasks.projectId });

  // Add deletion action to rows
  const filledRows = deletedRows.map((row) => ({
    projectId: row.projectId,
    action: 'delete',
  }));

  // Mark project associated with task dirty
  await markProjectsDirty(filledRows);
}
