import * as Crypto from 'expo-crypto';
import { eq } from 'drizzle-orm';
import { db } from './index';
import { projects, expenses } from './schema';

export async function deleteProjectFromDb(projectId) {
  await db.delete(projects).where(eq(projects.id, projectId));
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
  await db.update(expenses).set({
    ...(updatedFields.name && { name: updatedFields.name }),
    ...(
      updatedFields.amount !== undefined && {
        amount: parseInt(updatedFields.amount, 10),
      }
    ).where(eq(expenses.id, expenseId)),
  });
}

export async function deleteExpenseFromDb(expenseId) {
  await db.delete(expenses).where(eq(expenses.id, expenseId));
}
