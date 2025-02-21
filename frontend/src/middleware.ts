import { NextResponse, NextRequest } from 'next/server';

import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, sessionStatusEnum, setSessionStatusCookie } from '@/app/lib/session';
import { verify } from '@/app/lib/utils/jwt';
import { privateLinks, publicLinks } from '@/app/lib/constants/routes';

// 1. Specify protected and public routes
const protectedRoutes = privateLinks.map((link) => link.href);
const publicRoutes = publicLinks.map((link) => link.href);

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = await verify(cookie);

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    await setSessionStatusCookie(sessionStatusEnum.GUEST);

    return NextResponse.redirect(new URL('/auth/sign-in', req.nextUrl));
  }

  // 5. Redirect to /home if the user is authenticated
  if (isPublicRoute && session && !req.nextUrl.pathname.startsWith('/home')) {
    await setSessionStatusCookie(sessionStatusEnum.AUTHENTICATED);

    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }

  return NextResponse.next();
}



// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};