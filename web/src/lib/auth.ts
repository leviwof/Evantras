import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "evantras_secret_jwt_key_2026_chennai_consulting";
const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@evantras.com";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Evantras@Admin2026";

/**
 * Hash a plain text password with PBKDF2
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify a plain text password against a stored PBKDF2 hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;
  
  // If stored as salt:hash
  if (storedHash.includes(":")) {
    const [salt, originalHash] = storedHash.split(":");
    const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return testHash === originalHash;
  }
  
  // Direct fallback comparison for development default
  return password === storedHash;
}

/**
 * Create a signed, tamper-proof session token (valid for 7 days)
 */
export function createSessionToken(payload: { email: string; name?: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const data = Buffer.from(JSON.stringify({ ...payload, exp: expiresAt })).toString("base64url");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${data}`)
    .digest("base64url");

  return `${header}.${data}.${signature}`;
}

/**
 * Verify a session token and extract payload
 */
export function verifySessionToken(token: string): { email: string; name?: string } | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, data, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${data}`)
    .digest("base64url");

  if (signature !== expectedSig) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

export { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD };
