import { createContext, useContext, useState } from 'react';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import {
  insertExpenseToDb,
  updateExpenseInDb,
  deleteExpenseFromDb,
} from './projectService';
import { db } from './index';
import { projects, tasks, expenses } from './schema';
import { eq } from 'drizzle-orm';

// Explanation
// https://react.dev/learn/passing-data-deeply-with-context
const ActiveProjectContext = createContext(null);

export function ActiveProjectProvider({ children }) {
  const [activeProjectId, setActiveProjectId] = useState(null);

  const targetId = activeProjectId ?? '';

  // Get project from database when activeProjectId value changes or projects table changes in SQLite
  const { data: projectRows } = useLiveQuery(
    db.select().from(projects).where(eq(projects.id, targetId)),
    [targetId],
  );

  // Get tasks from database when activeProjectId value changes or tasks table changes in SQLite
  const { data: tasksRows } = useLiveQuery(
    db.select().from(tasks).where(eq(tasks.projectId, targetId)),
    [targetId],
  );

  // Get expenses from database if activeProjectId value changes or expenses table changes in SQLite
  const { data: expensesRows } = useLiveQuery(
    db.select().from(expenses).where(eq(expenses.projectId, targetId)),
    [targetId],
  );

  // Combine projectRows, tasksRows and expensesRows to one object
  const activeProject =
    activeProjectId && projectRows?.[0]
      ? {
          ...projectRows[0],
          tasks: tasksRows || [],
          expenses: expensesRows || [],
        }
      : null;

  const selectProject = (id) => {
    setActiveProjectId(id);
  };

  const createExpense = async (name, amount) => {
    if (!activeProjectId) return;
    await insertExpenseToDb(activeProjectId, name, amount);
  };

  const editExpense = async (expenseId, updatedFields) => {
    await updateExpenseInDb(expenseId, updatedFields);
  };

  const deleteExpense = async (expenseId) => {
    await deleteExpenseFromDb(expenseId);
  };

  return (
    <ActiveProjectContext.Provider
      value={{
        activeProject,
        selectProject,
        createExpense,
        editExpense,
        deleteExpense,
      }}
    >
      {children}
    </ActiveProjectContext.Provider>
  );
}

export function useActiveProject() {
  return useContext(ActiveProjectContext);
}
