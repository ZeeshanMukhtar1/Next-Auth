import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublichPath =
    path === '/login' || path === '/signup' || path === '/verifyemail';

  const token = request.cookies.get('token')?.value || '';
  if (isPublichPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!isPublichPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // here matcher means plese RUN this middleware for all the routes that are listed below 🙂
  matcher: ['/profile', '/login', '/signup', '/', '/verifyemail'],
};
