CREATE TABLE `dirty_projects` (
	`projects_id` text PRIMARY KEY,
	`action` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `projects` DROP COLUMN `sync_status`;