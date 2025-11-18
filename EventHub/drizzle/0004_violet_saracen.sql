PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_event_attendees` (
	`event_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`joined_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_event_attendees`("event_id", "user_id", "joined_at") SELECT "event_id", "user_id", "joined_at" FROM `event_attendees`;--> statement-breakpoint
DROP TABLE `event_attendees`;--> statement-breakpoint
ALTER TABLE `__new_event_attendees` RENAME TO `event_attendees`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `event_attendees_event_user_uniq` ON `event_attendees` (`event_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `event_attendees_user_idx` ON `event_attendees` (`user_id`);--> statement-breakpoint
CREATE INDEX `event_attendees_event_idx` ON `event_attendees` (`event_id`);--> statement-breakpoint
CREATE TABLE `__new_saved_events` (
	`event_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`saved_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_saved_events`("event_id", "user_id", "saved_at") SELECT "event_id", "user_id", "saved_at" FROM `saved_events`;--> statement-breakpoint
DROP TABLE `saved_events`;--> statement-breakpoint
ALTER TABLE `__new_saved_events` RENAME TO `saved_events`;--> statement-breakpoint
CREATE UNIQUE INDEX `saved_events_event_user_uniq` ON `saved_events` (`event_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `saved_events_user_idx` ON `saved_events` (`user_id`);--> statement-breakpoint
CREATE INDEX `saved_events_event_idx` ON `saved_events` (`event_id`);