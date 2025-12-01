ALTER TABLE `addresses` RENAME COLUMN "google_place_id" TO "city";--> statement-breakpoint
ALTER TABLE `addresses` ADD `area` text;--> statement-breakpoint
ALTER TABLE `addresses` ADD `country` text;--> statement-breakpoint
ALTER TABLE `addresses` ADD `updated_at` integer;