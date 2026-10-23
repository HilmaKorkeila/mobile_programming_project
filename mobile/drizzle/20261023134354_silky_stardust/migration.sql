PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_dirty_projects` (
	`projects_id` text PRIMARY KEY,
	`action` text DEFAULT 'upsert' NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_dirty_projects`(`projects_id`, `action`, `updated_at`) SELECT `projects_id`, `action`, `updated_at` FROM `dirty_projects`;--> statement-breakpoint
DROP TABLE `dirty_projects`;--> statement-breakpoint
ALTER TABLE `__new_dirty_projects` RENAME TO `dirty_projects`;--> statement-breakpoint
PRAGMA foreign_keys=ON;