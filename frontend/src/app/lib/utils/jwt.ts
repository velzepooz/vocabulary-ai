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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    return null;
  }
}
