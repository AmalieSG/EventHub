import { eventAttendees, events, users } from "./schema";
import { defineScript } from "rwsdk/worker";
import { getDb, setupDb } from ".";

export default defineScript(async ({ env }) => {
  try {
    await setupDb(env.DB)

    const db = await getDb()

    await db.delete(eventAttendees)
    await db.delete(events)
    await db.delete(users)
    
    const [admin] =await db
      .insert(users)
      .values({
        username: "admin",
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        passwordHash: "hashed_password_here",
        role: "admin",
      })
      .returning();
    
    const [user1, user2] = await db
      .insert(users)
      .values([
        {
          username: "user1",
          firstName: "User",
          lastName: "One",
          email: "user1@example.com",
          passwordHash: "hashed_password_here",
          role: "user"
        },
        {
          username: "user2",
          firstName: "User",
          lastName: "Two",
          email: "user2@example.com",
          passwordHash: "hashed_password_here",
          role: "user"
        },
      ])
      .returning()

    const [event1, event2] = await db
      .insert(events)
      .values([
        {
          title: "Tech Conference 2024",
          description: "A conference about the latest in tech.",
          summary: "Join us for a day of insightful talks and networking.",
          eventStart: new Date("2024-09-15T09:00:00Z"),
          address: "456 Tech Ave, Silicon Valley, CA",
          price: 199,
          hostId: user1.id,
          category: "Technology",
          imageUrl: "https://example.com/images/tech-conference.jpg",
          status: "upcoming"
        },
        {
          title: "Art Expo 2024",
          description: "An exhibition showcasing modern art.",
          summary: "Explore the works of contemporary artists from around the world.",
          eventStart: new Date("2024-10-20T10:00:00Z"),
          address: "789 Art St, New York, NY",
          price: 49,
          hostId: user2.id,
          category: "Art",
          imageUrl: "https://example.com/images/art-expo.jpg",
          status: "upcoming"
        }
      ])
      .returning();

    await db.insert(eventAttendees)
    .values([
      {
        eventId: event1.id,
        userId: user2.id,
      },
      {
        eventId: event2.id,
        userId: user1.id,
      }
    ])


    console.log("🌱 Finished seeding")

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.error("Error seeding database:", error)

    return Response.json({
      success: false,
      error: "Failed to seed database",
    })
  }
});