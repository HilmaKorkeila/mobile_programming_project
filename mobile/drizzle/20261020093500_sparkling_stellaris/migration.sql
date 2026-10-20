ALTER TABLE `tasks` RENAME COLUMN `is_favourite` TO `status`;--> statement-breakpoint

PRAGMA foreign_keys=OFF;--> statement-breakpoint

CREATE TABLE `__new_tasks` (
    `id` text PRIMARY KEY,
    `project_id` text NOT NULL,
    `name` text(50) NOT NULL,
    `created_at` integer NOT NULL,
    `status` text DEFAULT 'Not complete' NOT NULL,
    CONSTRAINT `fk_tasks_project_id_projects_id_fk`
        FOREIGN KEY (`project_id`)
        REFERENCES `projects`(`id`) ON DELETE CASCADE
);--> statement-breakpoint

INSERT INTO `__new_tasks` (`id`, `project_id`, `name`, `created_at`, `status`)
SELECT
    `id`,
    `project_id`,
    `name`,
    `created_at`,
    CASE
        WHEN `status` = 1 THEN 'Completed'
        ELSE 'Not complete'
    END
FROM `tasks`;--> statement-breakpoint

DROP TABLE `tasks`;--> statement-breakpoint

ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint

PRAGMA foreign_keys=ON;