import { Event } from "../types/event"

export const events: Event[] = [
  {
    id: 1,
    title: "Classical Night with the Philharmonic",
    shortDescription: "An unforgettable evening of Beethoven and Mozart.",
    longDescription:
      "Join the Oslo Philharmonic for a magical night of classical masterpieces. This special performance will feature Beethoven’s Symphony No. 5 and Mozart’s Piano Concerto No. 21, all in the stunning Oslo Concert Hall.",
    date: new Date("2025-11-12T19:30:00"),
    time: "19:30",
    placeName: "Oslo Concert Hall",
    address: "Munkedamsveien 14, 0115 Oslo",
    price: 250,
    attendeeIds: [1, 2, 3],
    hostId: 1,
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
    createdAt: new Date("2025-10-15T12:00:00"),
    updatedAt: new Date("2025-10-20T10:00:00"),
  },
  {
    id: 2,
    title: "Tech Innovators Meetup",
    shortDescription: "A networking event for startup founders and developers.",
    longDescription:
      "The Tech Innovators Meetup brings together entrepreneurs, engineers, and investors to discuss the latest in technology, product development, and funding opportunities. Snacks and drinks provided.",
    date: new Date("2025-12-01T18:00:00"),
    time: "18:00",
    placeName: "StartupLab",
    address: "Gaustadalléen 21, 0349 Oslo",
    price: 0,
    attendeeIds: [2, 4],
    hostId: 2,
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
    createdAt: new Date("2025-10-16T12:00:00"),
    updatedAt: new Date("2025-10-21T14:30:00"),
  },
  {
    id: 3,
    title: "Jazz Under the Stars",
    shortDescription: "Smooth jazz with a view over the city skyline.",
    longDescription:
      "Experience an intimate open-air jazz concert on the rooftop of the Oslo Opera House. Enjoy performances by top Norwegian jazz artists as the sun sets over the city. Bar and light snacks available.",
    date: new Date("2025-11-28T20:00:00"),
    time: "20:00",
    placeName: "Oslo Opera House Rooftop",
    address: "Kirsten Flagstads Plass 1, 0150 Oslo",
    price: 180,
    attendeeIds: [1, 3, 5, 6],
    hostId: 3,
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
    createdAt: new Date("2025-10-17T12:00:00"),
    updatedAt: new Date("2025-10-22T09:15:00"),
  },
  {
    id: 4,
    title: "Winter Food Festival",
    shortDescription: "Taste the best of Nordic cuisine.",
    longDescription:
      "Discover a wide range of delicious dishes at the Winter Food Festival. Local chefs and restaurants offer seasonal specialties, street food, and sweet treats. Perfect for food lovers and families.",
    date: new Date("2025-12-15T12:00:00"),
    time: "12:00",
    placeName: "Youngstorget",
    address: "Youngstorget 1, 0181 Oslo",
    price: 50,
    attendeeIds: [2, 5],
    hostId: 4,
    category: "Food & Drink",
    imageUrl:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
    createdAt: new Date("2025-10-18T12:00:00"),
    updatedAt: new Date("2025-10-22T11:45:00"),
  },
  {
    id: 5,
    title: "New Year's Eve Gala",
    shortDescription: "A glamorous night to welcome 2026.",
    longDescription:
      "Celebrate New Year’s Eve in style with live music, dinner, and fireworks. Dress code: black tie. The evening includes a three-course meal, champagne at midnight, and a spectacular fireworks show.",
    date: new Date("2025-12-31T21:00:00"),
    time: "21:00",
    placeName: "Grand Hotel Oslo",
    address: "Karl Johans gate 31, 0159 Oslo",
    price: 600,
    attendeeIds: [1, 2, 3, 4, 5, 6],
    hostId: 5,
    category: "Celebration",
    imageUrl:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
    createdAt: new Date("2025-10-19T12:00:00"),
    updatedAt: new Date("2025-10-23T08:00:00"),
  },
]
