import { PrismaClient } from '@prisma/client/edge';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from './app/lib/auth';

export async function middleware(request: NextRequest) {

  const clientCookies = cookies();
  const userPayload = await isAuthenticated(request, clientCookies);
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