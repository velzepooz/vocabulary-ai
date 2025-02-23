import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE_NAME, SESSION_STATUS_COOKIE_NAME } from '../session';

export async function signOut() {
  'use server';

  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete(SESSION_STATUS_COOKIE_NAME);

  redirect('/');
}