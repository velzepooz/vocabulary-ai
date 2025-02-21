import 'server-only';
import { cookies } from 'next/headers';

// Constants for cookie configuration
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const SESSION_COOKIE_NAME = 'authorization';
export const SESSION_STATUS_COOKIE_NAME = 'session_status';
export const sessionStatusEnum = {
  GUEST: 'GUEST',
  AUTHENTICATED: 'AUTHENTICATED',
} as const;
export type SessionStatus = (typeof sessionStatusEnum)[keyof typeof sessionStatusEnum];

export async function authenticate(token: string) {
  await createSession(token);
  await setSessionStatusCookie(sessionStatusEnum.AUTHENTICATED);
}

/**
 * Creates a new session by setting an HTTP-only cookie with the provided token
 * @param token - The session token to store in the cookie
 */
export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + ONE_DAY_IN_MS);

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function setSessionStatusCookie(status: SessionStatus) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_STATUS_COOKIE_NAME, status, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
  });
};

export async function getSessionStatus(): Promise<SessionStatus> {
  const cookieStore = await cookies();

  return cookieStore.get(SESSION_STATUS_COOKIE_NAME)?.value as SessionStatus || sessionStatusEnum.GUEST;
};
