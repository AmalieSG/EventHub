// src/db/seed.ts
import { eventAttendees, events, users, savedEvents } from "./schema";
import { defineScript } from "rwsdk/worker";
import { getDb, setupDb } from ".";

export default defineScript(async ({ env }) => {
  try {
    await setupDb(env.DB);
    const db = await getDb();

    // Delete in correct order
    await db.delete(savedEvents);
    await db.delete(eventAttendees);
    await db.delete(events);
    await db.delete(users);

    // --- Users ---
    const [admin, user1, user2, user3, user4] = await db
      .insert(users)
      .values([
        {
          username: "admin",
          firstName: "Admin",
          lastName: "User",
          email: "admin@example.com",
          passwordHash: "hashed_password_here",
          role: "admin",
          createdAt: new Date(1763377533000),
          isActive: true,
        },
        {
          username: "user1",
          firstName: "Anna",
          lastName: "Andersen",
          email: "user1@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: new Date(1763377533000),
          isActive: true,
        },
        {
          username: "user2",
          firstName: "Bjørn",
          lastName: "Berg",
          email: "user2@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: new Date(1763377533000),
          isActive: true,
        },
        {
          username: "user3",
          firstName: "Clara",
          lastName: "Christiansen",
          email: "user3@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: new Date(1763377533000),
          isActive: true,
        },
        {
          username: "user4",
          firstName: "David",
          lastName: "Dahl",
          email: "user4@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: new Date(1763377533000),
          isActive: true,
        },
      ])
      .returning();

    // --- Events: Don't specify id, let it auto-increment ---
    const firstBatch = await db
      .insert(events)
      .values([
        {
          title: "Tech Conference 2025",
          description: "A conference about the latest in software and AI.",
          summary: "Full-day tech event with talks and networking.",
          eventStart: new Date(1741597200000),
          address: "Tech Hub, Oslo",
          price: 199,
          hostId: user1.id,
          category: "Technology",
          imageUrl: "https://picsum.photos/id/1025/600/400",
          createdAt: new Date(1763377533000),
          status: "upcoming",
        },
        {
          title: "Art Expo Spring",
          description: "Exhibition of modern Scandinavian art.",
          summary: "Explore new works from emerging artists.",
          eventStart: new Date(1743850800000),
          address: "Art Gallery, Bergen",
          price: 120,
          hostId: user2.id,
          category: "Art",
          imageUrl: "https://picsum.photos/id/1074/600/400",
          createdAt: new Date(1763377533000),
          status: "upcoming",
        },
        {
          title: "Summer Music Festival",
          description: "Outdoor music festival with multiple stages.",
          summary: "Live bands, DJs and food trucks all weekend.",
          eventStart: new Date(1750428000000),
          address: "City Park, Trondheim",
          price: 850,
          hostId: user3.id,
          category: "Music",
          imageUrl: "https://picsum.photos/id/1015/600/400",
          createdAt: new Date(1763377533000),
          status: "upcoming",
        },
        {
          title: "Startup Pitch Night",
          description: "Local startups pitch to investors and the community.",
          summary: "Short pitches, Q&A and mingling.",
          eventStart: new Date(1739640600000),
          address: "Innovation House, Oslo",
          price: 0,
          hostId: user1.id,
          category: "Business",
          imageUrl: "https://picsum.photos/id/1003/600/400",
          createdAt: new Date(1763377533000),
          status: "ended",
        },
        {
          title: "Street Food Festival",
          description: "Tasting from food trucks and local restaurants.",
          summary: "Family-friendly food festival with live music.",
          eventStart: new Date(1746878400000),
          address: "Harbour Area, Stavanger",
          price: 50,
          hostId: user4.id,
          category: "Food & Drink",
          imageUrl: "https://picsum.photos/id/1060/600/400",
          createdAt: new Date(1763377533000),
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
          eventStart: new Date(1756713600000),
          address: "City Center, Oslo",
          price: 400,
          hostId: user2.id,
          category: "Sport",
          imageUrl: "https://picsum.photos/id/1084/600/400",
          createdAt: new Date(1763377533000),
          status: "upcoming",
        },
        {
          title: "Cultural Night Market",
          description: "Stands, performances and food from around the world.",
          summary: "Evening market celebrating diversity.",
          eventStart: new Date(1752343200000),
          address: "Old Town Square, Fredrikstad",
          price: 100,
          hostId: user3.id,
          category: "Culture",
          imageUrl: "https://picsum.photos/id/1062/600/400",
          createdAt: new Date(1763377533000),
          status: "upcoming",
        },
        {
          title: "Frontend Workshop",
          description: "Hands-on React and TypeScript workshop.",
          summary: "Bring your laptop and build a small app.",
          eventStart: new Date(1742896800000),
          address: "Cowork Space, Oslo",
          price: 900,
          hostId: user1.id,
          category: "Technology",
          imageUrl: "https://picsum.photos/id/1070/600/400",
          createdAt: new Date(1763377533000),
          status: "upcoming",
        },
        {
          title: "Wine & Cheese Evening",
          description: "Tasting of selected wines and local cheeses.",
          summary: "Guided tasting with sommelier.",
          eventStart: new Date(1745002800000),
          address: "Tasting Room, Bergen",
          price: 650,
          hostId: user4.id,
          category: "Food & Drink",
          imageUrl: "https://picsum.photos/id/1040/600/400",
          createdAt: new Date(1763377533000),
          status: "upcoming",
        },
        {
          title: "eSports Tournament",
          description: "Local eSports teams compete in popular games.",
          summary: "Full-day gaming event with finals on stage.",
          eventStart: new Date(1755856800000),
          address: "Arena, Oslo",
          price: 150,
          hostId: user2.id,
          category: "Sport",
          imageUrl: "https://picsum.photos/id/1018/600/400",
          createdAt: new Date(1763377533000),
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
      { eventId: event1.id, userId: user2.id, joinedAt: new Date(1763377533000) },
      { eventId: event1.id, userId: user3.id, joinedAt: new Date(1763377533000) },

      { eventId: event2.id, userId: user1.id, joinedAt: new Date(1763377533000) },
      { eventId: event2.id, userId: user4.id, joinedAt: new Date(1763377533000) },

      { eventId: event3.id, userId: user1.id, joinedAt: new Date(1763377533000) },
      { eventId: event3.id, userId: user2.id, joinedAt: new Date(1763377533000) },
      { eventId: event3.id, userId: user4.id, joinedAt: new Date(1763377533000) },

      { eventId: event4.id, userId: admin.id, joinedAt: new Date(1763377533000) },
      { eventId: event4.id, userId: user3.id, joinedAt: new Date(1763377533000) },

      { eventId: event5.id, userId: user2.id, joinedAt: new Date(1763377533000) },

      { eventId: event6.id, userId: user1.id, joinedAt: new Date(1763377533000) },
      { eventId: event6.id, userId: user3.id, joinedAt: new Date(1763377533000) },

      { eventId: event7.id, userId: user4.id, joinedAt: new Date(1763377533000) },

      { eventId: event8.id, userId: user1.id, joinedAt: new Date(1763377533000) },

      { eventId: event9.id, userId: user3.id, joinedAt: new Date(1763377533000) },

      { eventId: event10.id, userId: user2.id, joinedAt: new Date(1763377533000) },
      { eventId: event10.id, userId: user4.id, joinedAt: new Date(1763377533000) },
    ]);

    // --- Saved events ---
    await db.insert(savedEvents).values([
      { eventId: event1.id, userId: user1.id, savedAt: new Date(1763377533000) },
      { eventId: event3.id, userId: user1.id, savedAt: new Date(1763377533000) },
      { eventId: event8.id, userId: user1.id, savedAt: new Date(1763377533000) },

      { eventId: event2.id, userId: user2.id, savedAt: new Date(1763377533000) },
      { eventId: event6.id, userId: user2.id, savedAt: new Date(1763377533000) },

      { eventId: event3.id, userId: user3.id, savedAt: new Date(1763377533000) },
      { eventId: event7.id, userId: user3.id, savedAt: new Date(1763377533000) },

      { eventId: event5.id, userId: user4.id, savedAt: new Date(1763377533000) },
      { eventId: event9.id, userId: user4.id, savedAt: new Date(1763377533000) },
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