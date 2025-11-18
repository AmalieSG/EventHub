ALTER TABLE `users` ADD `is_active` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `last_login_at` integer;