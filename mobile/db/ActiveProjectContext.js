import { createContext, useContext, useState } from 'react';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import {
  deleteProjectFromDb,
  insertExpenseToDb,
  updateExpenseInDb,
  deleteExpenseFromDb,
  updateProjectInDb,
  insertTaskToDb,
  deleteTaskFromDb,
  updateTaskInDb,
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

  // Calculate total sum of expenses
  const totalExpenses =
    expensesRows?.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0,
    ) || 0;

  // Calculate task statistics: total, not completed, in progress and completed amounts
  const tasksTotal = tasksRows?.length || 0;
  const tasksNotComplete =
    tasksRows?.filter((task) => task.status === 'Not complete').length || 0;
  const tasksInProgress =
    tasksRows?.filter((task) => task.status === 'In progress').length || 0;
  const tasksCompleted =
    tasksRows?.filter((task) => task.status === 'Completed').length || 0;

  // Combine projectRows, tasksRows and expensesRows to one object
  const activeProject =
    activeProjectId && projectRows?.[0]
      ? {
          ...projectRows[0],
          tasks: tasksRows || [],
          expenses: expensesRows || [],
          totalExpenses,
          taskStats: {
            total: tasksTotal,
            notComplete: tasksNotComplete,
            inProgress: tasksInProgress,
            completed: tasksCompleted,
          },
        }
      : null;

  const selectProject = (id) => {
    setActiveProjectId(id);
  };

  const editProject = async (projectId, updatedFields) => {
    if (!activeProjectId) return;
    await updateProjectInDb(projectId, updatedFields);
  };

  const deleteProject = async (projectId) => {
    if (!activeProjectId) return;
    await deleteProjectFromDb(projectId);
  };

  const createExpense = async (name, amount) => {
    if (!activeProjectId) return;
    await insertExpenseToDb(activeProjectId, name, amount);
  };

  const editExpense = async (expenseId, updatedFields) => {
    console.log('ding');
    await updateExpenseInDb(expenseId, updatedFields);
  };

  const deleteExpense = async (expenseId) => {
    await deleteExpenseFromDb(expenseId);
  };

  const createTask = async (name) => {
    if (!activeProjectId) return;
    await insertTaskToDb(activeProjectId, name);
  };

  const editTask = async (taskId, updatedFields) => {
    await updateTaskInDb(taskId, updatedFields);
  };

  const deleteTask = async (taskId) => {
    await deleteTaskFromDb(taskId);
  };

  return (
    <ActiveProjectContext.Provider
      value={{
        activeProject,
        selectProject,
        editProject,
        deleteProject,
        createExpense,
        editExpense,
        deleteExpense,
        createTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </ActiveProjectContext.Provider>
  );
}

export function useActiveProject() {
  return useContext(ActiveProjectContext);
}
