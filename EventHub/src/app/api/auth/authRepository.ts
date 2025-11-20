// src/app/api/auth/authRepository.ts

import { getDb, type DB } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { User, CreateUser, SafeUser } from "@/db/schema";
import type { Result } from "@/app/types/result";
import { ResultHandler } from "@/app/lib/utils/result";
import { Errors } from "@/app/types/errors";

export interface AuthRepository {
    findUserByUsername(username: string): Promise<Result<User | null>>;
    findUserByEmail(email: string): Promise<Result<User | null>>;
    findUserById(id: number): Promise<Result<User | null>>;
    createUser(data: CreateUser): Promise<Result<SafeUser>>;
    updateLastLogin(userId: number): Promise<Result<void>>;
}

export function createAuthRepository(db: DB): AuthRepository {
    return {
        async findUserByUsername(username: string) {
            try {
                const result = await db
                    .select()
                    .from(users)
                    .where(eq(users.username, username))
                    .limit(1);

                return ResultHandler.success(result[0] || null);
            } catch (error) {
                console.error("Error finding user by username:", error);
                return ResultHandler.failure(
                    "Failed to find user",
                    Errors.INTERNAL_SERVER_ERROR
                );
            }
        },

        async findUserByEmail(email: string) {
            try {
                const result = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email))
                    .limit(1);

                return ResultHandler.success(result[0] || null);
            } catch (error) {
                console.error("Error finding user by email:", error);
                return ResultHandler.failure(
                    "Failed to find user",
                    Errors.INTERNAL_SERVER_ERROR
                );
            }
        },

        async findUserById(id: number) {
            try {
                const result = await db
                    .select()
                    .from(users)
                    .where(eq(users.id, id))
                    .limit(1);

                return ResultHandler.success(result[0] || null);
            } catch (error) {
                console.error("Error finding user by id:", error);
                return ResultHandler.failure(
                    "Failed to find user",
                    Errors.INTERNAL_SERVER_ERROR
                );
            }
        },

        async createUser(data: CreateUser) {
            try {
                const [newUser] = await db.insert(users).values(data).returning({
                    id: users.id,
                    username: users.email,
                    firstName: users.firstName,
                    lastName: users.lastName,
                    email: users.email,
                    phoneNumber: users.phoneNumber,
                    city: users.city,
                    country: users.country,
                    profilePicture: users.profilePicture,
                    role: users.role,
                    createdAt: users.createdAt,
                    updatedAt: users.updatedAt,
                    deletedAt: users.deletedAt,
                    isActive: users.isActive,
                    lastLoginAt: users.lastLoginAt,
                });

                return ResultHandler.success(newUser);
            } catch (error) {
                console.error("Error creating user:", error);
                return ResultHandler.failure(
                    "Failed to create user",
                    Errors.INTERNAL_SERVER_ERROR
                );
            }
        },

        async updateLastLogin(userId: number) {
            try {
                await db
                    .update(users)
                    .set({ lastLoginAt: new Date() })
                    .where(eq(users.id, userId));

                return ResultHandler.success(undefined);
            } catch (error) {
                console.error("Error updating last login:", error);
                return ResultHandler.failure(
                    "Failed to update last login",
                    Errors.INTERNAL_SERVER_ERROR
                );
            }
        },
    };
}

export const authRepository = createAuthRepository(await getDb());