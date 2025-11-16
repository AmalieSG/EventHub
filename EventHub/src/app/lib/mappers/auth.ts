// src/app/lib/mappers/auth.ts

import type { SafeUser, Session } from "@/db/schema";
import type {
  UserDTO,
  SessionDTO,
  AuthResponseDTO,
} from "@/app/lib/schema/auth/auth-dtos";

// Map SafeUser to UserDTO (in general doing nothing at this point)
export function mapUserToDTO(user: SafeUser): UserDTO {
  return {
    id: user.id,
    username: user.username,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function mapSessionToDTO(session: Session): SessionDTO {
  return {
    id: session.id,
    userId: session.userId,
    expiresAt: session.expiresAt,
    createdAt: session.createdAt,
  };
}

export function mapAuthResponseToDTO(
  user: SafeUser,
  session: Session
): AuthResponseDTO {
  return {
    user: mapUserToDTO(user),
    session: mapSessionToDTO(session),
  };
}