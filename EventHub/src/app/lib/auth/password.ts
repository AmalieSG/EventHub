// src/app/lib/auth/password.ts

/**
 * PBKDF2 configuration (OWASP recommended for Web Crypto API)
 */
const PBKDF2_CONFIG = {
  iterations: 100000, // OWASP recommendation for PBKDF2-SHA256
  hashAlgorithm: 'SHA-256',
  saltLength: 16,
  keyLength: 32,
};

/**
 * Hash password using PBKDF2 (Web Crypto API - Cloudflare Workers compatible)
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(PBKDF2_CONFIG.saltLength));
    const passwordData = encoder.encode(password);

    // Import password as key
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordData,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    // Derive key using PBKDF2
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: PBKDF2_CONFIG.iterations,
        hash: PBKDF2_CONFIG.hashAlgorithm,
      },
      keyMaterial,
      PBKDF2_CONFIG.keyLength * 8
    );

    // Convert to hex and combine with salt
    const hashArray = Array.from(new Uint8Array(derivedBits));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');

    // Store as: iterations:salt:hash
    return `${PBKDF2_CONFIG.iterations}:${saltHex}:${hashHex}`;
  } catch (error) {
    console.error("Password hashing error:", error);
    throw new Error("Failed to hash password");
  }
}

/**
 * Verify password against PBKDF2 hash
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  try {
    // Parse stored hash
    const parts = storedHash.split(':');
    if (parts.length !== 3) {
      return false;
    }

    const [iterationsStr, saltHex, hashHex] = parts;
    const iterations = parseInt(iterationsStr, 10);

    // Convert hex strings back to Uint8Array
    const salt = new Uint8Array(
      saltHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16))
    );

    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);

    // Import password as key
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordData,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    // Derive key using same parameters
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: iterations,
        hash: PBKDF2_CONFIG.hashAlgorithm,
      },
      keyMaterial,
      PBKDF2_CONFIG.keyLength * 8
    );

    // Convert to hex and compare
    const hashArray = Array.from(new Uint8Array(derivedBits));
    const computedHashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return computedHashHex === hashHex;
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

/**
 * Password strength validator
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