import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const clientCookies = cookies();
  clientCookies.delete('accessToken');
  clientCookies.delete('refreshToken');

  return NextResponse.redirect(new URL('/', request.url));
}
