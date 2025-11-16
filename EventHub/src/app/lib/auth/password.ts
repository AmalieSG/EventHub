// src/app/lib/auth/password.ts

import {
  hashPassword as hash,
  verifyPassword as verify,
} from "better-auth/crypto";

// Hash a password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  try {
    return await hash(password);
  } catch (error) {
    console.error("Password hashing error:", error);
    throw new Error("Failed to hash password");
  }
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await verify({
      password,
      hash,
    });
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Passord må være minst 8 tegn");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Passord må inneholde minst én liten bokstav");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Passord må inneholde minst én stor bokstav");
  }

  if (!/\d/.test(password)) {
    errors.push("Passord må inneholde minst ett tall");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}