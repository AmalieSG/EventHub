CREATE TABLE `event_attendees` (
	`event_id` text NOT NULL,
	`user_id` integer NOT NULL,
	`joined_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_attendees_event_user_uniq` ON `event_attendees` (`event_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `event_attendees_user_idx` ON `event_attendees` (`user_id`);--> statement-breakpoint
CREATE INDEX `event_attendees_event_idx` ON `event_attendees` (`event_id`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`summary` text NOT NULL,
	`eventStart` integer NOT NULL,
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
CREATE INDEX `events_host_idx` ON `events` (`hostId`);--> statement-breakpoint
CREATE INDEX `events_start_idx` ON `events` (`eventStart`);--> statement-breakpoint
CREATE INDEX `events_status_idx` ON `events` (`status`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`phone_number` text,
	`city` text,
	`country` text,
	`profile_picture` text,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_number_unique` ON `users` (`phone_number`);--> statement-breakpoint
CREATE TABLE `saved_events` (
	`event_id` text NOT NULL,
	`user_id` integer NOT NULL,
	`saved_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `saved_events_event_user_uniq` ON `saved_events` (`event_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `saved_events_user_idx` ON `saved_events` (`user_id`);--> statement-breakpoint
CREATE INDEX `saved_events_event_idx` ON `saved_events` (`event_id`);