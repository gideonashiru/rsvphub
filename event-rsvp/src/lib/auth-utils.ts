import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';

export interface DummyUser {
  id: string;
  username: string;
  dummy_email: string;
}

export interface SessionData {
  userId: string;
  username: string;
  createdAt: number;
}

const DUMMY_AUTH_COOKIE = 'dummy_auth_session';
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Creates a session token for dummy auth
 */
export function createSessionToken(userId: string, username: string): string {
  const sessionData: SessionData = {
    userId,
    username,
    createdAt: Date.now(),
  };
  
  // Encode as base64 for cookie storage
  return Buffer.from(JSON.stringify(sessionData)).toString('base64');
}

/**
 * Decodes and validates a session token
 */
export function decodeSessionToken(token: string): SessionData | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const sessionData = JSON.parse(decoded) as SessionData;
    
    // Check if session has expired
    if (Date.now() - sessionData.createdAt > SESSION_DURATION) {
      return null;
    }
    
    return sessionData;
  } catch (error) {
    return null;
  }
}

/**
 * Sets the authentication cookie
 */
export async function setAuthCookie(userId: string, username: string) {
  try {
    const cookieStore = await cookies();
    const token = createSessionToken(userId, username);
    
    cookieStore.set(DUMMY_AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DURATION / 1000, // Convert to seconds
      path: '/',
    });
  } catch (error) {
    console.error('Error setting auth cookie:', error);
    throw error;
  }
}

/**
 * Gets the authenticated user from cookies
 */
export async function getAuthUser(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(DUMMY_AUTH_COOKIE)?.value;
  
  if (!token) {
    return null;
  }
  
  return decodeSessionToken(token);
}

/**
 * Clears the authentication cookie
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(DUMMY_AUTH_COOKIE);
}

/**
 * Generates a unique user ID
 */
export function generateUserId(): string {
  return uuidv4();
}

/**
 * Generates a dummy email from username
 */
export function generateDummyEmail(username: string): string {
  return `${username.toLowerCase()}@dummy.local`;
}
