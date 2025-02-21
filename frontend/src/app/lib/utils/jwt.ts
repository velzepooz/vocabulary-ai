import 'server-only';
import { jwtVerify } from 'jose';
import { User } from '../types/auth.types';

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function verify(
  token: string | undefined = '',
): Promise<User | null> {
  try {
    const { payload } = await jwtVerify<User>(token, encodedKey);

    return payload;
  } catch (error: unknown) {
    console.error('Failed to verify session', error);

    return null;
  }
}
