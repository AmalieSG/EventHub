// src/db/seed.ts
import { eventAttendees, events, users, savedEvents } from "./schema";
import { defineScript } from "rwsdk/worker";
import { getDb, setupDb } from ".";

export default defineScript(async ({ env }) => {
  try {
    await setupDb(env.DB);
    const db = await getDb();

    // Slett i riktig rekkefølge
    await db.delete(savedEvents);
    await db.delete(eventAttendees);
    await db.delete(events);
    await db.delete(users);

    // --- Users ---
    const [admin] = await db
      .insert(users)
      .values({
        username: "admin",
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        passwordHash: "hashed_password_here",
        role: "admin",
        createdAt: new Date(),
        isActive: true,
      })
      .returning();

    const [user1, user2, user3, user4] = await db
      .insert(users)
      .values([
        {
          username: "user1",
          firstName: "Anna",
          lastName: "Andersen",
          email: "user1@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: new Date(),
          isActive: true,
        },
        {
          username: "user2",
          firstName: "Bjørn",
          lastName: "Berg",
          email: "user2@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: new Date(),
          isActive: true,
        },
        {
          username: "user3",
          firstName: "Clara",
          lastName: "Christiansen",
          email: "user3@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: new Date(),
          isActive: true,
        },
        {
          username: "user4",
          firstName: "David",
          lastName: "Dahl",
          email: "user4@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: new Date(),
          isActive: true,
        },
      ])
      .returning();

    // --- Events: splitt i to batcher (5 + 5) for å unngå "too many sql variables" ---
    const firstBatch = await db
      .insert(events)
      .values([
        {
          title: "Tech Conference 2025",
          description: "A conference about the latest in software and AI.",
          summary: "Full-day tech event with talks and networking.",
          eventStart: new Date("2025-03-10T09:00:00Z"),
          address: "Tech Hub, Oslo",
          price: 199,
          hostId: user1.id,
          category: "Technology",
          imageUrl: "https://example.com/images/tech-conf.jpg",
          status: "upcoming",
        },
        {
          title: "Art Expo Spring",
          description: "Exhibition of modern Scandinavian art.",
          summary: "Explore new works from emerging artists.",
          eventStart: new Date("2025-04-05T11:00:00Z"),
          address: "Art Gallery, Bergen",
          price: 120,
          hostId: user2.id,
          category: "Art",
          imageUrl: "https://example.com/images/art-expo.jpg",
          status: "upcoming",
        },
        {
          title: "Summer Music Festival",
          description: "Outdoor music festival with multiple stages.",
          summary: "Live bands, DJs and food trucks all weekend.",
          eventStart: new Date("2025-06-20T14:00:00Z"),
          address: "City Park, Trondheim",
          price: 850,
          hostId: user3.id,
          category: "Music",
          imageUrl: "https://example.com/images/music-festival.jpg",
          status: "upcoming",
        },
        {
          title: "Startup Pitch Night",
          description: "Local startups pitch to investors and the community.",
          summary: "Short pitches, Q&A and mingling.",
          eventStart: new Date("2025-02-15T17:30:00Z"),
          address: "Innovation House, Oslo",
          price: 0,
          hostId: user1.id,
          category: "Business",
          imageUrl: "https://example.com/images/pitch-night.jpg",
          status: "ended",
        },
        {
          title: "Street Food Festival",
          description: "Tasting from food trucks and local restaurants.",
          summary: "Family-friendly food festival with live music.",
          eventStart: new Date("2025-05-10T12:00:00Z"),
          address: "Harbour Area, Stavanger",
          price: 50,
          hostId: user4.id,
          category: "Food & Drink",
          imageUrl: "https://example.com/images/food-festival.jpg",
          status: "upcoming",
        },
      ])
      .returning();

    const secondBatch = await db
      .insert(events)
      .values([
        {
          title: "Marathon 10K Run",
          description: "Annual 10K run for all levels.",
          summary: "Timed race with medals and afterparty.",
          eventStart: new Date("2025-09-01T08:00:00Z"),
          address: "City Center, Oslo",
          price: 400,
          hostId: user2.id,
          category: "Sport",
          imageUrl: "https://example.com/images/run.jpg",
          status: "upcoming",
        },
        {
          title: "Cultural Night Market",
          description: "Stands, performances and food from around the world.",
          summary: "Evening market celebrating diversity.",
          eventStart: new Date("2025-07-12T18:00:00Z"),
          address: "Old Town Square, Fredrikstad",
          price: 100,
          hostId: user3.id,
          category: "Culture",
          imageUrl: "https://example.com/images/culture-night.jpg",
          status: "upcoming",
        },
        {
          title: "Frontend Workshop",
          description: "Hands-on React and TypeScript workshop.",
          summary: "Bring your laptop and build a small app.",
          eventStart: new Date("2025-03-25T10:00:00Z"),
          address: "Cowork Space, Oslo",
          price: 900,
          hostId: user1.id,
          category: "Technology",
          imageUrl: "https://example.com/images/frontend-workshop.jpg",
          status: "upcoming",
        },
        {
          title: "Wine & Cheese Evening",
          description: "Tasting of selected wines and local cheeses.",
          summary: "Guided tasting with sommelier.",
          eventStart: new Date("2025-04-18T19:00:00Z"),
          address: "Tasting Room, Bergen",
          price: 650,
          hostId: user4.id,
          category: "Food & Drink",
          imageUrl: "https://example.com/images/wine-cheese.jpg",
          status: "upcoming",
        },
        {
          title: "eSports Tournament",
          description: "Local eSports teams compete in popular games.",
          summary: "Full-day gaming event with finals on stage.",
          eventStart: new Date("2025-08-22T10:00:00Z"),
          address: "Arena, Oslo",
          price: 150,
          hostId: user2.id,
          category: "Sport",
          imageUrl: "https://example.com/images/esports.jpg",
          status: "upcoming",
        },
      ])
      .returning();

    const insertedEvents = [...firstBatch, ...secondBatch];

    const [
      event1, event2, event3, event4, event5,
      event6, event7, event8, event9, event10
    ] = insertedEvents;

    // --- Attendees ---
    await db.insert(eventAttendees).values([
      { eventId: event1.id, userId: user2.id },
      { eventId: event1.id, userId: user3.id },

      { eventId: event2.id, userId: user1.id },
      { eventId: event2.id, userId: user4.id },

      { eventId: event3.id, userId: user1.id },
      { eventId: event3.id, userId: user2.id },
      { eventId: event3.id, userId: user4.id },

      { eventId: event4.id, userId: admin.id },
      { eventId: event4.id, userId: user3.id },

      { eventId: event5.id, userId: user2.id },

      { eventId: event6.id, userId: user1.id },
      { eventId: event6.id, userId: user3.id },

      { eventId: event7.id, userId: user4.id },

      { eventId: event8.id, userId: user1.id },

      { eventId: event9.id, userId: user3.id },

      { eventId: event10.id, userId: user2.id },
      { eventId: event10.id, userId: user4.id },
    ]);

    // --- Saved events ---
    await db.insert(savedEvents).values([
      { eventId: event1.id, userId: user1.id },
      { eventId: event3.id, userId: user1.id },
      { eventId: event8.id, userId: user1.id },

      { eventId: event2.id, userId: user2.id },
      { eventId: event6.id, userId: user2.id },

      { eventId: event3.id, userId: user3.id },
      { eventId: event7.id, userId: user3.id },

      { eventId: event5.id, userId: user4.id },
      { eventId: event9.id, userId: user4.id },
    ]);

    console.log("🌱 Finished seeding");

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Error seeding database:", error);
    if (error.cause) {
      console.error("Underlying cause:", error.cause);
    }
    return Response.json({
      success: false,
      error: "Failed to seed database",
    });
  }
});
