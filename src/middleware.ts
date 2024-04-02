import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // configuring the path
  const path = request.nextUrl.pathname;

  // setting up public paths
  const isPublichPath =
    path === '/login' || path === '/signup' || path === '/verifyemail';

  // getting the token from the cookies
  const token = request.cookies.get('token')?.value || '';

  // if the path is public and token is there it means user is logged in  ✅
  if (isPublichPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // if the path is not public and token is not there it means user is not logged in ❌
  if (!isPublichPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // here matcher means plese RUN this middleware for all the routes that are listed below 🙂
  matcher: ['/profile', '/login', '/signup', '/', '/verifyemail'],
};
