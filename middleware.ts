import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from './app/lib/auth';

const PROTECTED_ADMIN_ROUTES = [
  '/api/users',
  '/api/users/add',
  '/api/users/update',
  '/api/roles',
]

export async function middleware(request: NextRequest) {

  const clientCookies = cookies();
  const userPayload = await isAuthenticated(request, clientCookies);

  if (PROTECTED_ADMIN_ROUTES.includes(request.nextUrl.pathname)) {
    if (!userPayload || !userPayload.admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    if (userPayload !== null) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (userPayload === null) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!userPayload.admin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}