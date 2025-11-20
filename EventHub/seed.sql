PRAGMA foreign_keys=OFF;

-- Drop all tables
DROP TABLE IF EXISTS event_attendees;
DROP TABLE IF EXISTS saved_events;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

PRAGMA foreign_keys=ON;

-- Recreate tables
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
	`deleted_at` integer,
	`is_active` integer DEFAULT true NOT NULL,
	`last_login_at` integer
);

CREATE TABLE `events` (
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

CREATE TABLE `event_attendees` (
	`event_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`joined_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `saved_events` (
	`event_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`saved_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

-- Create indexes
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
CREATE UNIQUE INDEX `users_phone_number_unique` ON `users` (`phone_number`);
CREATE INDEX `events_host_idx` ON `events` (`hostId`);
CREATE INDEX `events_start_idx` ON `events` (`eventStart`);
CREATE INDEX `events_status_idx` ON `events` (`status`);
CREATE UNIQUE INDEX `event_attendees_event_user_uniq` ON `event_attendees` (`event_id`,`user_id`);
CREATE INDEX `event_attendees_user_idx` ON `event_attendees` (`user_id`);
CREATE INDEX `event_attendees_event_idx` ON `event_attendees` (`event_id`);
CREATE UNIQUE INDEX `saved_events_event_user_uniq` ON `saved_events` (`event_id`,`user_id`);
CREATE INDEX `saved_events_user_idx` ON `saved_events` (`user_id`);
CREATE INDEX `saved_events_event_idx` ON `saved_events` (`event_id`);

-- Insert seed data
INSERT INTO "users" VALUES(1,'admin','Admin','User','admin@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'admin',1763377533,NULL,NULL,1,NULL);
INSERT INTO "users" VALUES(2,'user1','Anna','Andersen','user1@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'user',1763377533,NULL,NULL,1,NULL);
INSERT INTO "users" VALUES(3,'user2','Bjørn','Berg','user2@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'user',1763377533,NULL,NULL,1,NULL);
INSERT INTO "users" VALUES(4,'user3','Clara','Christiansen','user3@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'user',1763377533,NULL,NULL,1,NULL);
INSERT INTO "users" VALUES(5,'user4','David','Dahl','user4@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'user',1763377533,NULL,NULL,1,NULL);

INSERT INTO "events" VALUES(1,'Tech Conference 2025','A conference about the latest in software and AI.','Full-day tech event with talks and networking.',1741597200,'Tech Hub, Oslo',199,2,'Technology','https://picsum.photos/id/1025/600/400',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES(2,'Art Expo Spring','Exhibition of modern Scandinavian art.','Explore new works from emerging artists.',1743850800,'Art Gallery, Bergen',120,3,'Art','https://picsum.photos/id/1074/600/400',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES(3,'Summer Music Festival','Outdoor music festival with multiple stages.','Live bands, DJs and food trucks all weekend.',1750428000,'City Park, Trondheim',850,4,'Music','https://picsum.photos/id/1015/600/400',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES(4,'Startup Pitch Night','Local startups pitch to investors and the community.','Short pitches, Q&A and mingling.',1739640600,'Innovation House, Oslo',0,2,'Business','https://picsum.photos/id/1003/600/400',1763377533,NULL,NULL,'ended');
INSERT INTO "events" VALUES(5,'Street Food Festival','Tasting from food trucks and local restaurants.','Family-friendly food festival with live music.',1746878400,'Harbour Area, Stavanger',50,5,'Food & Drink','https://picsum.photos/id/1060/600/400',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES(6,'Marathon 10K Run','Annual 10K run for all levels.','Timed race with medals and afterparty.',1756713600,'City Center, Oslo',400,3,'Sport','https://picsum.photos/id/1084/600/400',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES(7,'Cultural Night Market','Stands, performances and food from around the world.','Evening market celebrating diversity.',1752343200,'Old Town Square, Fredrikstad',100,4,'Culture','https://picsum.photos/id/1062/600/400',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES(8,'Frontend Workshop','Hands-on React and TypeScript workshop.','Bring your laptop and build a small app.',1742896800,'Cowork Space, Oslo',900,2,'Technology','https://picsum.photos/id/1070/600/400',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES(9,'Wine & Cheese Evening','Tasting of selected wines and local cheeses.','Guided tasting with sommelier.',1745002800,'Tasting Room, Bergen',650,5,'Food & Drink','https://picsum.photos/id/1040/600/400',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES(10,'eSports Tournament','Local eSports teams compete in popular games.','Full-day gaming event with finals on stage.',1755856800,'Arena, Oslo',150,3,'Sport','https://picsum.photos/id/1018/600/400',1763377533,NULL,NULL,'upcoming');

INSERT INTO "event_attendees" VALUES(1,3,1763377533);
INSERT INTO "event_attendees" VALUES(1,4,1763377533);
INSERT INTO "event_attendees" VALUES(2,2,1763377533);
INSERT INTO "event_attendees" VALUES(2,5,1763377533);
INSERT INTO "event_attendees" VALUES(3,2,1763377533);
INSERT INTO "event_attendees" VALUES(3,3,1763377533);
INSERT INTO "event_attendees" VALUES(3,5,1763377533);
INSERT INTO "event_attendees" VALUES(4,1,1763377533);
INSERT INTO "event_attendees" VALUES(4,4,1763377533);
INSERT INTO "event_attendees" VALUES(5,3,1763377533);
INSERT INTO "event_attendees" VALUES(6,2,1763377533);
INSERT INTO "event_attendees" VALUES(6,4,1763377533);
INSERT INTO "event_attendees" VALUES(7,5,1763377533);
INSERT INTO "event_attendees" VALUES(8,2,1763377533);
INSERT INTO "event_attendees" VALUES(9,4,1763377533);
INSERT INTO "event_attendees" VALUES(10,3,1763377533);
INSERT INTO "event_attendees" VALUES(10,5,1763377533);

INSERT INTO "saved_events" VALUES(1,2,1763377533);
INSERT INTO "saved_events" VALUES(3,2,1763377533);
INSERT INTO "saved_events" VALUES(8,2,1763377533);
INSERT INTO "saved_events" VALUES(2,3,1763377533);
INSERT INTO "saved_events" VALUES(6,3,1763377533);
INSERT INTO "saved_events" VALUES(3,4,1763377533);
INSERT INTO "saved_events" VALUES(7,4,1763377533);
INSERT INTO "saved_events" VALUES(5,5,1763377533);
INSERT INTO "saved_events" VALUES(9,5,1763377533);