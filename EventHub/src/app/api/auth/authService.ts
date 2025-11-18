// src/app/api/auth/authService.ts

import { authRepository, type AuthRepository } from "./authRepository";
import {
    hashPassword,
    verifyPassword,
    validatePasswordStrength,
} from "@/app/lib/auth/password";

import type { LoginCredentials, RegisterCredentials } from "@/app/types/auth";
import type { SafeUser, Session } from "@/db/schema";
import type { Result } from "@/app/types/result";
import { ResultHandler } from "@/app/lib/utils/result";
import { Errors } from "@/app/types/errors";
import {
    LoginDTOSchema,
    RegisterDTOSchema,
} from "@/app/lib/schema/auth/auth-dtos";

import { createSession, deleteSession } from "@/app/lib/auth/session";
import { mapUserToDTO } from "@/app/lib/mappers/auth";
import { requestInfo } from "rwsdk/worker";

export interface AuthService {
    register(
        credentials: RegisterCredentials
    ): Promise<Result<{ user: SafeUser; session: Session }>>;
    login(
        credentials: LoginCredentials
    ): Promise<Result<{ user: SafeUser; session: Session }>>;
    logout(sessionId?: string): Promise<Result<void>>;
    createAdminUser(
        credentials: RegisterCredentials
    ): Promise<Result<{ user: SafeUser; session: Session }>>;
    currentUser(userId: number): Promise<Result<SafeUser>>;
}

export function createAuthService(authRepository: AuthRepository): AuthService {
    // Simple helper to handle failure on session creation
    // Prevent DRY since it is used multiple times
    const createUserSession = async (userId: number) => {
        const sessionResult = await createSession(userId); // This ties authservice. Could be handled in controller or as events
        if (!sessionResult.success) {
            throw new Error("Failed to create session");
        }
        return sessionResult.data;
    };

    return {
        // Often needed in frontend to get the current user data in a hook or context
        // UserId is provided by the context given from redwood and the
        // middleware that sets the user and session
        async currentUser(userId) {
            try {
                const userResult = await authRepository.findUserById(userId);
                if (!userResult.success) {
                    return ResultHandler.failure(
                        userResult.error,
                        Errors.INTERNAL_SERVER_ERROR
                    );
                }
                if (!userResult.data) {
                    return ResultHandler.failure("User not found", Errors.NOT_FOUND);
                }
                return ResultHandler.success(userResult.data);
            } catch (error) {
                console.error("Error fetching current user:", error);
                return ResultHandler.failure(
                    "Failed to fetch current user",
                    Errors.INTERNAL_SERVER_ERROR
                );
            }
        },
        async register(credentials) {
            try {
                // Validate input with DTO schema
                const validation = RegisterDTOSchema.safeParse(credentials);
                if (!validation.success) {
                    return ResultHandler.failure(
                        `Validation failed: ${validation.error.message}`,
                        Errors.VALIDATION_ERROR
                    );
                }

                const { username, email, password, firstName, lastName } = validation.data;


                // Validate password strength
                const passwordValidation = validatePasswordStrength(password);
                if (!passwordValidation.isValid) {
                    return ResultHandler.failure(
                        passwordValidation.errors.join(", "),
                        Errors.VALIDATION_ERROR
                    );
                }

                // ! Check if email or username already exists (crashes due to simultaneous requests on SQLLite)
                // const existingUser = await Promise.race([
                //   authRepository.findUserByUsername(username),
                //   authRepository.findUserByEmail(email),
                // ]);
                const existingUserByEmail = await authRepository.findUserByEmail(email);
                const existingUserByUsername = await authRepository.findUserByUsername(
                    username
                );

                if (!existingUserByEmail.success || !existingUserByUsername.success) {
                    return ResultHandler.failure(
                        "Feil ved sjekk av eksisterende brukere",
                        Errors.INTERNAL_SERVER_ERROR
                    );
                }

                if (existingUserByEmail.data || existingUserByUsername.data) {
                    return ResultHandler.failure(
                        "Bruker eksisterer allerede",
                        Errors.CONFLICT
                    ); // Careful exposing this, then people will know that a user exists
                }

                // Hash password
                const passwordHash = await hashPassword(password);

                // Create user
                const createUserResult = await authRepository.createUser({
                    username,
                    email,
                    passwordHash,
                    role: "user", 
                    firstName,
                    lastName,
                });

                if (!createUserResult.success) {
                    return ResultHandler.failure(
                        createUserResult.error,
                        Errors.INTERNAL_SERVER_ERROR
                    );
                }

                const newUser = createUserResult.data;

                // Create session
                const session = await createUserSession(newUser.id);

                return ResultHandler.success({
                    user: newUser,
                    session,
                });
            } catch (error) {
                console.error("Registration error:", error);
                return ResultHandler.failure(
                    "Registration failed",
                    Errors.INTERNAL_SERVER_ERROR
                );
            }
        },

        async login(credentials) {
            try {
                // Validate input
                const validation = LoginDTOSchema.safeParse(credentials);

                if (!validation.success) {
                    return ResultHandler.failure(
                        "Ugyldig brukernavn eller passord",
                        Errors.UNAUTHORIZED
                    );
                }

                const { username, password } = validation.data;

                // Find user by username
                const userResult = await authRepository.findUserByUsername(username);

                if (!userResult.success) {
                    return ResultHandler.failure(
                        userResult.error,
                        Errors.INTERNAL_SERVER_ERROR
                    );
                }

                if (!userResult.data) {
                    return ResultHandler.failure(
                        "Ugyldig brukernavn eller passord",
                        Errors.UNAUTHORIZED
                    );
                }

                const { id, passwordHash, isActive } = userResult.data;

                // Check if user is active
                if (!isActive) {
                    return ResultHandler.failure(
                        "Kontoen er deaktivert",
                        Errors.FORBIDDEN
                    );
                }

                // Verify password
                const isPasswordValid = await verifyPassword(password, passwordHash);

                if (!isPasswordValid) {
                    return ResultHandler.failure(
                        "Ugyldig brukernavn eller passord",
                        Errors.UNAUTHORIZED
                    );
                }

                // Create session
                const session = await createUserSession(id);

                const safeUser: SafeUser = {
                    ...userResult.data,  
                    ...mapUserToDTO(userResult.data),
                };

                // Return user without password hash
                return ResultHandler.success({
                    user: safeUser,
                    session,
                });
            } catch (error) {
                console.error("Login error:", error);
                return ResultHandler.failure(
                    "Login failed",
                    Errors.INTERNAL_SERVER_ERROR
                );
            }
        },

        async logout(sessionId) {
            if (!sessionId) {
                return ResultHandler.failure(
                    "Session ID is required",
                    Errors.UNAUTHORIZED
                );
            }

            return await deleteSession(sessionId);
        },
        // Create an admin user, typically used for initial setup or by admins
        async createAdminUser(credentials) {
            try {
                // Check if admin already exists
                const adminExist = await authRepository.findUserByUsername(
                    credentials.username
                );

                if (!adminExist.success) {
                    return ResultHandler.failure(
                        adminExist.error,
                        Errors.INTERNAL_SERVER_ERROR
                    );
                }

                if (adminExist.data) {
                    return ResultHandler.failure(
                        "Bruker eksisterer allerede",
                        Errors.CONFLICT
                    );
                }

                // Validate input
                const validation = RegisterDTOSchema.safeParse(credentials);
                if (!validation.success) {
                    return ResultHandler.failure(
                        `Validation failed: ${validation.error.message}`,
                        Errors.VALIDATION_ERROR
                    );
                }

                const { username, email, password, firstName, lastName } = validation.data;

                // Validate password strength
                const passwordValidation = validatePasswordStrength(password);

                if (!passwordValidation.isValid) {
                    return ResultHandler.failure(
                        passwordValidation.errors.join(", "),
                        Errors.VALIDATION_ERROR
                    );
                }

                // Hash password
                const passwordHash = await hashPassword(password);

                // Create admin user
                const createUserResult = await authRepository.createUser({
                    username,
                    email,
                    passwordHash,
                    lastName,
                    firstName,
                    role: "admin",
                });

                if (!createUserResult.success) {
                    return ResultHandler.failure(
                        createUserResult.error,
                        Errors.INTERNAL_SERVER_ERROR
                    );
                }
                // Create session
                const session = await createUserSession(createUserResult.data.id);

                // TODO: Could send email to invite user where the user must set their password
                // Using events or other service
                return ResultHandler.success({
                    user: createUserResult.data,
                    session,
                });
            } catch (error) {
                console.error("Admin creation error:", error);
                return ResultHandler.failure(
                    "Failed to create admin user",
                    Errors.INTERNAL_SERVER_ERROR
                );
            }
        },
    };
}

export const authService = createAuthService(authRepository);