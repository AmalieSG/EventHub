-- Clear existing data
DELETE FROM saved_events;
DELETE FROM event_attendees;
DELETE FROM events;
DELETE FROM users;

------------------------------------------------------------
-- USERS
------------------------------------------------------------

INSERT INTO users (id, username, first_name, last_name, email, password_hash, role, created_at)
VALUES
  (1, 'admin', 'Admin', 'User', 'admin@example.com', 'hashed_password_here', 'admin', strftime('%s','now'));

INSERT INTO users (id, username, first_name, last_name, email, password_hash, role, created_at)
VALUES
  (2, 'user1', 'Anna', 'Andersen', 'user1@example.com', 'hashed_password_here', 'user', strftime('%s','now')),
  (3, 'user2', 'Bjørn', 'Berg', 'user2@example.com', 'hashed_password_here', 'user', strftime('%s','now')),
  (4, 'user3', 'Clara', 'Christiansen', 'user3@example.com', 'hashed_password_here', 'user', strftime('%s','now')),
  (5, 'user4', 'David', 'Dahl', 'user4@example.com', 'hashed_password_here', 'user', strftime('%s','now'));

------------------------------------------------------------
-- EVENTS (10 total)
------------------------------------------------------------

INSERT INTO events (id, title, description, summary, eventStart, address, price, hostId, category, imageUrl, created_at, status)
VALUES
  ('event1', 'Tech Conference 2025', 'A conference about the latest in software and AI.', 'Full-day tech event with talks and networking.', strftime('%s','2025-03-10T09:00:00Z'), 'Tech Hub, Oslo', 199, 2, 'Technology', 'https://example.com/images/tech-conf.jpg', strftime('%s','now'), 'upcoming'),

  ('event2', 'Art Expo Spring', 'Exhibition of modern Scandinavian art.', 'Explore new works from emerging artists.', strftime('%s','2025-04-05T11:00:00Z'), 'Art Gallery, Bergen', 120, 3, 'Art', 'https://example.com/images/art-expo.jpg', strftime('%s','now'), 'upcoming'),

  ('event3', 'Summer Music Festival', 'Outdoor music festival with multiple stages.', 'Live bands, DJs and food trucks all weekend.', strftime('%s','2025-06-20T14:00:00Z'), 'City Park, Trondheim', 850, 4, 'Music', 'https://example.com/images/music-festival.jpg', strftime('%s','now'), 'upcoming'),

  ('event4', 'Startup Pitch Night', 'Local startups pitch to investors and the community.', 'Short pitches, Q&A and mingling.', strftime('%s','2025-02-15T17:30:00Z'), 'Innovation House, Oslo', 0, 2, 'Business', 'https://example.com/images/pitch-night.jpg', strftime('%s','now'), 'ended'),

  ('event5', 'Street Food Festival', 'Tasting from food trucks and local restaurants.', 'Family-friendly food festival with live music.', strftime('%s','2025-05-10T12:00:00Z'), 'Harbour Area, Stavanger', 50, 5, 'Food & Drink', 'https://example.com/images/food-festival.jpg', strftime('%s','now'), 'upcoming'),

  ('event6', 'Marathon 10K Run', 'Annual 10K run for all levels.', 'Timed race with medals and afterparty.', strftime('%s','2025-09-01T08:00:00Z'), 'City Center, Oslo', 400, 3, 'Sport', 'https://example.com/images/run.jpg', strftime('%s','now'), 'upcoming'),

  ('event7', 'Cultural Night Market', 'Stands, performances and food from around the world.', 'Evening market celebrating diversity.', strftime('%s','2025-07-12T18:00:00Z'), 'Old Town Square, Fredrikstad', 100, 4, 'Culture', 'https://example.com/images/culture-night.jpg', strftime('%s','now'), 'upcoming'),

  ('event8', 'Frontend Workshop', 'Hands-on React and TypeScript workshop.', 'Bring your laptop and build a small app.', strftime('%s','2025-03-25T10:00:00Z'), 'Cowork Space, Oslo', 900, 2, 'Technology', 'https://example.com/images/frontend-workshop.jpg', strftime('%s','now'), 'upcoming'),

  ('event9', 'Wine & Cheese Evening', 'Tasting of selected wines and local cheeses.', 'Guided tasting with sommelier.', strftime('%s','2025-04-18T19:00:00Z'), 'Tasting Room, Bergen', 650, 5, 'Food & Drink', 'https://example.com/images/wine-cheese.jpg', strftime('%s','now'), 'upcoming'),

  ('event10', 'eSports Tournament', 'Local eSports teams compete in popular games.', 'Full-day gaming event with finals on stage.', strftime('%s','2025-08-22T10:00:00Z'), 'Arena, Oslo', 150, 3, 'Sport', 'https://example.com/images/esports.jpg', strftime('%s','now'), 'upcoming');

------------------------------------------------------------
-- EVENT ATTENDEES
------------------------------------------------------------

INSERT INTO event_attendees (event_id, user_id, joined_at)
VALUES
  ('event1', 3, strftime('%s','now')),
  ('event1', 4, strftime('%s','now')),

  ('event2', 2, strftime('%s','now')),
  ('event2', 5, strftime('%s','now')),

  ('event3', 2, strftime('%s','now')),
  ('event3', 3, strftime('%s','now')),
  ('event3', 5, strftime('%s','now')),

  ('event4', 1, strftime('%s','now')),
  ('event4', 4, strftime('%s','now')),

  ('event5', 3, strftime('%s','now')),

  ('event6', 2, strftime('%s','now')),
  ('event6', 4, strftime('%s','now')),

  ('event7', 5, strftime('%s','now')),

  ('event8', 2, strftime('%s','now')),

  ('event9', 4, strftime('%s','now')),

  ('event10', 3, strftime('%s','now')),
  ('event10', 5, strftime('%s','now'));

------------------------------------------------------------
-- SAVED EVENTS
------------------------------------------------------------

INSERT INTO saved_events (event_id, user_id, saved_at)
VALUES
  ('event1', 2, strftime('%s','now')),
  ('event3', 2, strftime('%s','now')),
  ('event8', 2, strftime('%s','now')),

  ('event2', 3, strftime('%s','now')),
  ('event6', 3, strftime('%s','now')),

  ('event3', 4, strftime('%s','now')),
  ('event7', 4, strftime('%s','now')),

  ('event5', 5, strftime('%s','now')),
  ('event9', 5, strftime('%s','now'));
