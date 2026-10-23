import { db } from './index';
import { eq, ne, inArray } from 'drizzle-orm';
import { projects, tasks, expenses, dirtyProjects } from './schema';

const API_BASE_URL = '';
let isSyncing = false;

export async function syncPendingProjects() {
  console.log('attempting cloud sync', isSyncing);
  // Don't sync if already syncing
  if (isSyncing) return;
  isSyncing = true;

  try {
    // Sync project deletion
    const deleteProjects = await db
      .select({ projectId: dirtyProjects.projectId })
      .from(dirtyProjects)
      .where(eq(dirtyProjects.action, 'delete'));

    console.log('=== PROJECTS FOR DELETION ===');
    console.log(deleteProjects);

    for (const project of deleteProjects) {
      // TODO delete project
      console.log(`${project.projectId} is marked for delete`);
    }

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

    console.log('=== PROJECTS FOR UPSERT ===');
    console.log(upsertProjects);

    for (const project of upsertProjects) {
      // TODO upsert project
      console.log(`${project.name} is marked for upsert`);
    }
  } catch (error) {
    console.log('error syncing to cloud', error);
  } finally {
    // Syncing complete, allow new syncPendingProjects()-call
    isSyncing = false;
  }
}
