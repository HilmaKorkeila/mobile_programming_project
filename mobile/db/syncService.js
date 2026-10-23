import { db } from './index';
import { eq, ne, inArray } from 'drizzle-orm';
import { projects, tasks, expenses, dirtyProjects } from './schema';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
let isSyncing = false;

export async function syncPendingProjects() {
  // Don't sync if already syncing
  if (isSyncing) return;
  isSyncing = true;

  try {
    // Sync project deletion

    // Get id:s of deleted project from dirtyProjects
    const deleteProjects = await db
      .select({ projectId: dirtyProjects.projectId })
      .from(dirtyProjects)
      .where(eq(dirtyProjects.action, 'delete'));

    for (const project of deleteProjects) {
      // Send delete request to cloud
      const response = await fetch(
        `${API_BASE_URL}/sync/projects/${project.projectId}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        const data = await response.json();

        // Remove dirtyProject row if server returns OK
        if (data.projectId) {
          await db
            .delete(dirtyProjects)
            .where(eq(dirtyProjects.projectId, data.projectId));
        }
      } else {
        console.warn(`Server responded with status: ${response.status}`);
      }
    }

    // Get projects matching dirtyProjects projectId and action 'upsert'
    const upsertProjects = await db
      .select()
      .from(projects)
      .where(
        inArray(
          projects.id,
          db
            .select({ projectId: dirtyProjects.projectId })
            .from(dirtyProjects)
            .where(eq(dirtyProjects.action, 'upsert')),
        ),
      );

    for (const project of upsertProjects) {
      // Get tasks associated with project
      const projectTasks = await db
        .select()
        .from(tasks)
        .where(eq(tasks.projectId, project.id));

      const projectExpenses = await db
        .select()
        .from(tasks)
        .where(eq(tasks.projectId, project.id));

      // Add expenses and tasks arrays to project object
      const payload = {
        ...project,
        tasks: projectTasks,
        expenses: projectExpenses,
      };

      // Send put request to cloud
      const response = await fetch(
        `${API_BASE_URL}/sync/projects/${project.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        const data = await response.json();

        // Remove dirtyProject row if server returns OK
        if (data.projectId) {
          await db
            .delete(dirtyProjects)
            .where(eq(dirtyProjects.projectId, data.projectId));
        }
      } else {
        console.warn(`Server responded with status: ${response.status}`);
      }
    }
  } catch (error) {
    // No logging if errors occured. Status codes from server are logged
  } finally {
    // Syncing complete, allow new syncPendingProjects()-call
    isSyncing = false;
  }
}
