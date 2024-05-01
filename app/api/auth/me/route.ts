import { isAuthenticated } from '@/app/lib/auth';
import { cookies } from "next/headers";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const clientCookies = cookies();
  const user = await isAuthenticated(request, clientCookies);

  if (user === null) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}