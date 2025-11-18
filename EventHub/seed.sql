PRAGMA foreign_keys=OFF;

DROP TABLE IF EXISTS event_attendees;
DROP TABLE IF EXISTS saved_events;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS d1_migrations;

PRAGMA foreign_keys=ON;

CREATE TABLE d1_migrations(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "d1_migrations" VALUES(1,'0000_closed_newton_destine.sql','2025-11-16 17:47:32');
INSERT INTO "d1_migrations" VALUES(2,'0001_rare_metal_master.sql','2025-11-16 23:49:59');
INSERT INTO "d1_migrations" VALUES(3,'0002_quick_queen_noir.sql','2025-11-16 23:55:10');
CREATE TABLE `event_attendees` (
	`event_id` text NOT NULL,
	`user_id` integer NOT NULL,
	`joined_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO "event_attendees" VALUES('event1',3,1763377533);
INSERT INTO "event_attendees" VALUES('event1',4,1763377533);
INSERT INTO "event_attendees" VALUES('event2',2,1763377533);
INSERT INTO "event_attendees" VALUES('event2',5,1763377533);
INSERT INTO "event_attendees" VALUES('event3',2,1763377533);
INSERT INTO "event_attendees" VALUES('event3',3,1763377533);
INSERT INTO "event_attendees" VALUES('event3',5,1763377533);
INSERT INTO "event_attendees" VALUES('event4',1,1763377533);
INSERT INTO "event_attendees" VALUES('event4',4,1763377533);
INSERT INTO "event_attendees" VALUES('event5',3,1763377533);
INSERT INTO "event_attendees" VALUES('event6',2,1763377533);
INSERT INTO "event_attendees" VALUES('event6',4,1763377533);
INSERT INTO "event_attendees" VALUES('event7',5,1763377533);
INSERT INTO "event_attendees" VALUES('event8',2,1763377533);
INSERT INTO "event_attendees" VALUES('event9',4,1763377533);
INSERT INTO "event_attendees" VALUES('event10',3,1763377533);
INSERT INTO "event_attendees" VALUES('event10',5,1763377533);
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
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
INSERT INTO "events" VALUES('event1','Tech Conference 2025','A conference about the latest in software and AI.','Full-day tech event with talks and networking.',1741597200,'Tech Hub, Oslo',199,2,'Technology','https://example.com/images/tech-conf.jpg',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES('event2','Art Expo Spring','Exhibition of modern Scandinavian art.','Explore new works from emerging artists.',1743850800,'Art Gallery, Bergen',120,3,'Art','https://example.com/images/art-expo.jpg',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES('event3','Summer Music Festival','Outdoor music festival with multiple stages.','Live bands, DJs and food trucks all weekend.',1750428000,'City Park, Trondheim',850,4,'Music','https://example.com/images/music-festival.jpg',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES('event4','Startup Pitch Night','Local startups pitch to investors and the community.','Short pitches, Q&A and mingling.',1739640600,'Innovation House, Oslo',0,2,'Business','https://example.com/images/pitch-night.jpg',1763377533,NULL,NULL,'ended');
INSERT INTO "events" VALUES('event5','Street Food Festival','Tasting from food trucks and local restaurants.','Family-friendly food festival with live music.',1746878400,'Harbour Area, Stavanger',50,5,'Food & Drink','https://example.com/images/food-festival.jpg',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES('event6','Marathon 10K Run','Annual 10K run for all levels.','Timed race with medals and afterparty.',1756713600,'City Center, Oslo',400,3,'Sport','https://example.com/images/run.jpg',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES('event7','Cultural Night Market','Stands, performances and food from around the world.','Evening market celebrating diversity.',1752343200,'Old Town Square, Fredrikstad',100,4,'Culture','https://example.com/images/culture-night.jpg',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES('event8','Frontend Workshop','Hands-on React and TypeScript workshop.','Bring your laptop and build a small app.',1742896800,'Cowork Space, Oslo',900,2,'Technology','https://example.com/images/frontend-workshop.jpg',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES('event9','Wine & Cheese Evening','Tasting of selected wines and local cheeses.','Guided tasting with sommelier.',1745002800,'Tasting Room, Bergen',650,5,'Food & Drink','https://example.com/images/wine-cheese.jpg',1763377533,NULL,NULL,'upcoming');
INSERT INTO "events" VALUES('event10','eSports Tournament','Local eSports teams compete in popular games.','Full-day gaming event with finals on stage.',1755856800,'Arena, Oslo',150,3,'Sport','https://example.com/images/esports.jpg',1763377533,NULL,NULL,'upcoming');
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
, `is_active` integer DEFAULT true NOT NULL, `last_login_at` integer);
INSERT INTO "users" VALUES(1,'admin','Admin','User','admin@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'admin',1763377533,NULL,NULL,1,NULL);
INSERT INTO "users" VALUES(2,'user1','Anna','Andersen','user1@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'user',1763377533,NULL,NULL,1,NULL);
INSERT INTO "users" VALUES(3,'user2','Bjørn','Berg','user2@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'user',1763377533,NULL,NULL,1,NULL);
INSERT INTO "users" VALUES(4,'user3','Clara','Christiansen','user3@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'user',1763377533,NULL,NULL,1,NULL);
INSERT INTO "users" VALUES(5,'user4','David','Dahl','user4@example.com','hashed_password_here',NULL,NULL,NULL,NULL,'user',1763377533,NULL,NULL,1,NULL);
CREATE TABLE `saved_events` (
	`event_id` text NOT NULL,
	`user_id` integer NOT NULL,
	`saved_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO "saved_events" VALUES('event1',2,1763377533);
INSERT INTO "saved_events" VALUES('event3',2,1763377533);
INSERT INTO "saved_events" VALUES('event8',2,1763377533);
INSERT INTO "saved_events" VALUES('event2',3,1763377533);
INSERT INTO "saved_events" VALUES('event6',3,1763377533);
INSERT INTO "saved_events" VALUES('event3',4,1763377533);
INSERT INTO "saved_events" VALUES('event7',4,1763377533);
INSERT INTO "saved_events" VALUES('event5',5,1763377533);
INSERT INTO "saved_events" VALUES('event9',5,1763377533);
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('d1_migrations',3);
INSERT INTO "sqlite_sequence" VALUES('users',10);
CREATE UNIQUE INDEX `event_attendees_event_user_uniq` ON `event_attendees` (`event_id`,`user_id`);
CREATE INDEX `event_attendees_user_idx` ON `event_attendees` (`user_id`);
CREATE INDEX `event_attendees_event_idx` ON `event_attendees` (`event_id`);
CREATE INDEX `events_host_idx` ON `events` (`hostId`);
CREATE INDEX `events_start_idx` ON `events` (`eventStart`);
CREATE INDEX `events_status_idx` ON `events` (`status`);
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
CREATE UNIQUE INDEX `users_phone_number_unique` ON `users` (`phone_number`);
CREATE UNIQUE INDEX `saved_events_event_user_uniq` ON `saved_events` (`event_id`,`user_id`);
CREATE INDEX `saved_events_user_idx` ON `saved_events` (`user_id`);
CREATE INDEX `saved_events_event_idx` ON `saved_events` (`event_id`);