CREATE TABLE `expenses` (
	`id` text PRIMARY KEY,
	`project_id` text NOT NULL,
	`name` text(50) NOT NULL,
	`budget` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	CONSTRAINT `fk_expenses_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY,
	`name` text(50) NOT NULL,
	`description` text(200) NOT NULL,
	`budget` integer DEFAULT 0 NOT NULL,
	`is_favourite` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text PRIMARY KEY,
	`project_id` text NOT NULL,
	`name` text(50) NOT NULL,
	`created_at` integer NOT NULL,
	`is_favourite` integer DEFAULT false NOT NULL,
	CONSTRAINT `fk_tasks_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);
