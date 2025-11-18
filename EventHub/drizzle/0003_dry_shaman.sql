PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`summary` text NOT NULL,
	`eventStart` integer NOT NULL,
	`address` text NOT NULL,
	`price` integer NOT NULL,
	`hostId` integer NOT NULL,
	`category` text NOT NULL,
	`imageUrl` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	`status` text DEFAULT 'upcoming' NOT NULL,
	FOREIGN KEY (`hostId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_events`("id", "title", "description", "summary", "eventStart", "address", "price", "hostId", "category", "imageUrl", "created_at", "updated_at", "deleted_at", "status") SELECT "id", "title", "description", "summary", "eventStart", "address", "price", "hostId", "category", "imageUrl", "created_at", "updated_at", "deleted_at", "status" FROM `events`;--> statement-breakpoint
DROP TABLE `events`;--> statement-breakpoint
ALTER TABLE `__new_events` RENAME TO `events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `events_host_idx` ON `events` (`hostId`);--> statement-breakpoint
CREATE INDEX `events_start_idx` ON `events` (`eventStart`);--> statement-breakpoint
CREATE INDEX `events_status_idx` ON `events` (`status`);