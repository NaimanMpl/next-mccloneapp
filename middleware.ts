import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ADMIN_ROUTES = [
  '/api/users',
  '/api/users/add',
  '/api/users/update',
  '/api/roles',
]

export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET});

  if (PROTECTED_ADMIN_ROUTES.includes(request.nextUrl.pathname)) {
    if (!token || !token.admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
  }

  if (request.nextUrl.pathname.startsWith('/account')) {
    if (token === null) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token !== null) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (token === null) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!token.admin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}