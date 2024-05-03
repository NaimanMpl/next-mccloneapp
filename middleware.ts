import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from './app/lib/auth';

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/play')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    const clientCookies = cookies();
    if (await isAuthenticated(request, clientCookies) !== null) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}