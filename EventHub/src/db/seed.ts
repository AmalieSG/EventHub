import { defineScript } from "rwsdk/worker";
import { getDb, setupDb } from ".";
import {
  users,
  events,
  eventAttendees,
  savedEvents,
  addresses,
} from "./schema";
import { hashPassword } from "@/app/lib/auth/password";

export default defineScript(async ({ env }) => {
  try {
    console.log("🌱 Seeding database...");
    await setupDb(env.DB);
    const db = await getDb();

    await db.delete(savedEvents);
    await db.delete(eventAttendees);
    await db.delete(events);
    await db.delete(addresses);
    await db.delete(users);

    const fixedCreatedAt = new Date(1763377533000); 
    const knownPasswordHash = await hashPassword("Test1234");

    // ---- Users ----
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
          createdAt: fixedCreatedAt,
          isActive: true,
          bio: "System administrator for EventHub.",
        },
        {
          username: "user1",
          firstName: "Anna",
          lastName: "Andersen",
          email: "user1@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: fixedCreatedAt,
          isActive: true,
          bio: "Tech enthusiast and community organizer focusing on developer meetups.",
        },
        {
          username: "user2",
          firstName: "Bjørn",
          lastName: "Berg",
          email: "user2@example.com",
          passwordHash: knownPasswordHash,
          role: "user",
          createdAt: fixedCreatedAt,
          isActive: true,
          bio: "Event planner with a passion for sports and outdoor activities.",
        },
        {
          username: "user3",
          firstName: "Clara",
          lastName: "Christiansen",
          email: "user3@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: fixedCreatedAt,
          isActive: true,
          bio: "Cultural events curator focusing on art, music and local festivals.",
        },
        {
          username: "user4",
          firstName: "David",
          lastName: "Dahl",
          email: "user4@example.com",
          passwordHash: "hashed_password_here",
          role: "user",
          createdAt: fixedCreatedAt,
          isActive: true,
          bio: "Food and wine lover hosting tastings and culinary experiences.",
        },
      ])
      .returning();

    // ---- Addresses ----
    const [
      techHub,
      artGallery,
      cityPark,
      innovationHouse,
      harbourStavanger,
      cityCenterOslo,
      oldTownFredrikstad,
      coworkOslo,
      tastingRoomBergen,
      arenaOslo,
    ] = await db
      .insert(addresses)
      .values([
        {
          label: "Tech Hub, Oslo",
          formattedAddress: "Rebel, Universitetsgata 2, 0164 Oslo, Norway",
          city: "Oslo",
          country: "Norway",
        },
        {
          label: "Art Gallery, Bergen",
          formattedAddress: "KODE 2, Rasmus Meyers allé 3, 5015 Bergen, Norway",
          city: "Bergen",
          country: "Norway",
        },
        {
          label: "City Park, Trondheim",
          formattedAddress: "Marinen Park, Marinen, 7013 Trondheim, Norway",
          city: "Trondheim",
          country: "Norway",
        },
        {
          label: "Innovation House, Oslo",
          formattedAddress:
            "Forskningsparken, Gaustadalléen 21, 0349 Oslo, Norway",
          city: "Oslo",
          country: "Norway",
        },
        {
          label: "Harbour Area, Stavanger",
          formattedAddress: "Skansekaien 30, 4006 Stavanger, Norway",
          city: "Stavanger",
          country: "Norway",
        },
        {
          label: "City Center, Oslo",
          formattedAddress: "Jernbanetorget 1, 0154 Oslo, Norway",
          city: "Oslo",
          country: "Norway",
        },
        {
          label: "Old Town Square, Fredrikstad",
          formattedAddress:
            "Voldportgaten 73, 1632 Gamle Fredrikstad, Norway",
          city: "Fredrikstad",
          country: "Norway",
        },
        {
          label: "Cowork Space, Oslo",
          formattedAddress:
            "MESH Youngstorget, Møllergata 6, 0179 Oslo, Norway",
          city: "Oslo",
          country: "Norway",
        },
        {
          label: "Tasting Room, Bergen",
          formattedAddress:
            "Vinbaren på Grand, Nedre Ole Bulls plass 1, 5012 Bergen, Norway",
          city: "Bergen",
          country: "Norway",
        },
        {
          label: "Arena, Oslo",
          formattedAddress:
            "Oslo Spektrum, Sonja Henies plass 2, 0185 Oslo, Norway",
          city: "Oslo",
          country: "Norway",
        },
      ])
      .returning();

    // ---- Events ----
    const firstBatch = await db
      .insert(events)
      .values([
        {
          title: "Tech Conference 2025",
          description: "A conference about the latest in software and AI.",
          summary: "Full-day tech event with talks and networking.",
          eventStart: new Date(1741597200000),
          addressId: techHub.id,
          price: 199,
          hostId: user1.id,
          category: "Technology",
          imageUrl: "https://picsum.photos/id/1025/600/400",
          createdAt: fixedCreatedAt,
          status: "upcoming",
          includedFeatures: "Access to all sessions,Networking lunch,Event swag",
        },
        {
          title: "Art Expo Spring",
          description: "Exhibition of modern Scandinavian art.",
          summary: "Explore new works from emerging artists.",
          eventStart: new Date(1743850800000),
          addressId: artGallery.id,
          price: 120,
          hostId: user2.id,
          category: "Art",
          imageUrl: "https://picsum.photos/id/1074/600/400",
          createdAt: fixedCreatedAt,
          status: "upcoming",
          includedFeatures: "Entry to exhibition,Catalogue of artworks,Meet the artists session",
        },
        {
          title: "Summer Music Festival",
          description: "Outdoor music festival with multiple stages.",
          summary: "Live bands, DJs and food trucks all weekend.",
          eventStart: new Date(1750428000000),
          addressId: cityPark.id,
          price: 850,
          hostId: user3.id,
          category: "Music",
          imageUrl: "https://picsum.photos/id/1015/600/400",
          createdAt: fixedCreatedAt,
          status: "upcoming",
          includedFeatures: "Access to all stages,Camping area,Free merchandise",
        },
        {
          title: "Startup Pitch Night",
          description: "Local startups pitch to investors and the community.",
          summary: "Short pitches, Q&A and mingling.",
          eventStart: new Date(1739640600000),
          addressId: innovationHouse.id,
          price: 0,
          hostId: user1.id,
          category: "Business",
          imageUrl: "https://picsum.photos/id/1003/600/400",
          createdAt: fixedCreatedAt,
          status: "ended",
          includedFeatures: "Pitch sessions,Networking opportunities,Refreshments",
        },
        {
          title: "Street Food Festival",
          description: "Tasting from food trucks and local restaurants.",
          summary: "Family-friendly food festival with live music.",
          eventStart: new Date(1746878400000),
          addressId: harbourStavanger.id,
          price: 50,
          hostId: user4.id,
          category: "Food & Drink",
          imageUrl: "https://picsum.photos/id/1060/600/400",
          createdAt: fixedCreatedAt,
          status: "upcoming",
          includedFeatures: "Food tasting,Live entertainment,Kids activities",
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
          addressId: cityCenterOslo.id,
          price: 400,
          hostId: user2.id,
          category: "Sport",
          imageUrl: "https://picsum.photos/id/1084/600/400",
          createdAt: fixedCreatedAt,
          status: "upcoming",
          includedFeatures: "Race entry,Finisher medal,Afterparty access",
        },
        {
          title: "Cultural Night Market",
          description:
            "Stands, performances and food from around the world.",
          summary: "Evening market celebrating diversity.",
          eventStart: new Date(1752343200000),
          addressId: oldTownFredrikstad.id,
          price: 100,
          hostId: user3.id,
          category: "Culture",
          imageUrl: "https://picsum.photos/id/1062/600/40",
          createdAt: fixedCreatedAt,
          status: "upcoming",
          includedFeatures: "Market access,Live performances,Cultural workshops",
        },
        {
          title: "Frontend Workshop",
          description: "Hands-on React and TypeScript workshop.",
          summary: "Bring your laptop and build a small app.",
          eventStart: new Date(1742896800000),
          addressId: coworkOslo.id,
          price: 900,
          hostId: user1.id,
          category: "Technology",
          imageUrl: "https://picsum.photos/id/1070/600/400",
          createdAt: fixedCreatedAt,
          status: "upcoming",
          includedFeatures: "Workshop materials,Coffee and snacks,Certificate of completion",
        },
        {
          title: "Wine & Cheese Evening",
          description:
            "Tasting of selected wines and local cheeses.",
          summary: "Guided tasting with sommelier.",
          eventStart: new Date(1745002800000),
          addressId: tastingRoomBergen.id,
          price: 650,
          hostId: user4.id,
          category: "Food & Drink",
          imageUrl: "https://picsum.photos/id/1040/600/400",
          createdAt: fixedCreatedAt,
          status: "upcoming",
          includedFeatures: "Wine tasting,Cheese pairing,Sommelier guidance",
        },
        {
          title: "eSports Tournament",
          description:
            "Local eSports teams compete in popular games.",
          summary: "Full-day gaming event with finals on stage.",
          eventStart: new Date(1755856800000),
          addressId: arenaOslo.id,
          price: 150,
          hostId: user2.id,
          category: "Sport",
          imageUrl: "https://picsum.photos/id/1018/600/400",
          createdAt: fixedCreatedAt,
          status: "upcoming",
          includedFeatures: "Tournament access,Meet the players,Gaming merchandise",
        },
      ])
      .returning();

    const insertedEvents = [...firstBatch, ...secondBatch];

    const [
      event1,
      event2,
      event3,
      event4,
      event5,
      event6,
      event7,
      event8,
      event9,
      event10,
    ] = insertedEvents;

    // ---- Attendees ----
    await db.insert(eventAttendees).values([
      { eventId: event1.id, userId: user2.id, joinedAt: fixedCreatedAt },
      { eventId: event1.id, userId: user3.id, joinedAt: fixedCreatedAt },

      { eventId: event2.id, userId: user1.id, joinedAt: fixedCreatedAt },
      { eventId: event2.id, userId: user4.id, joinedAt: fixedCreatedAt },

      { eventId: event3.id, userId: user1.id, joinedAt: fixedCreatedAt },
      { eventId: event3.id, userId: user2.id, joinedAt: fixedCreatedAt },
      { eventId: event3.id, userId: user4.id, joinedAt: fixedCreatedAt },

      { eventId: event4.id, userId: admin.id, joinedAt: fixedCreatedAt },
      { eventId: event4.id, userId: user3.id, joinedAt: fixedCreatedAt },

      { eventId: event5.id, userId: user2.id, joinedAt: fixedCreatedAt },

      { eventId: event6.id, userId: user1.id, joinedAt: fixedCreatedAt },
      { eventId: event6.id, userId: user3.id, joinedAt: fixedCreatedAt },

      { eventId: event7.id, userId: user4.id, joinedAt: fixedCreatedAt },

      { eventId: event8.id, userId: user1.id, joinedAt: fixedCreatedAt },

      { eventId: event9.id, userId: user3.id, joinedAt: fixedCreatedAt },

      { eventId: event10.id, userId: user2.id, joinedAt: fixedCreatedAt },
      { eventId: event10.id, userId: user4.id, joinedAt: fixedCreatedAt },
    ]);

    // ---- Saved events ----
    await db.insert(savedEvents).values([
      { eventId: event1.id, userId: user1.id, savedAt: fixedCreatedAt },
      { eventId: event3.id, userId: user1.id, savedAt: fixedCreatedAt },
      { eventId: event8.id, userId: user1.id, savedAt: fixedCreatedAt },

      { eventId: event2.id, userId: user2.id, savedAt: fixedCreatedAt },
      { eventId: event6.id, userId: user2.id, savedAt: fixedCreatedAt },

      { eventId: event3.id, userId: user3.id, savedAt: fixedCreatedAt },
      { eventId: event7.id, userId: user3.id, savedAt: fixedCreatedAt },

      { eventId: event5.id, userId: user4.id, savedAt: fixedCreatedAt },
      { eventId: event9.id, userId: user4.id, savedAt: fixedCreatedAt },
    ]);

    console.log("✅ Finished seeding");
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