import type { User } from "../types/user"

export const users: User[] = [
  {
    id: 1,
    firstName: "Maria",
    lastName: "Nilsen",
    email: "maria@example.com",
    role: "user",
    createdAt: "2025-09-01T08:00:00Z",
  },
  {
    id: 2,
    firstName: "Jonas",
    lastName: "Berg",
    email: "jonas@example.com",
    role: "user",
    createdAt: "2025-09-05T09:30:00Z",
  },
  {
    id: 3,
    firstName: "Sara",
    lastName: "Holm",
    email: "sara@example.com",
    role: "user",
    createdAt: "2025-09-10T12:00:00Z",
  },
  {
    id: 4,
    firstName: "Ola",
    lastName: "Lund",
    email: "ola@example.com",
    role: "user",
    createdAt: "2025-09-15T15:45:00Z",
  },
]
