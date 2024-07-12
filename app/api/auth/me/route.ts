import prisma from '@/app/lib/db';
import userMiddleware from '@/app/middlewares/user.middleware';
import { UserPayload } from '@/app/models/user.model';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const username = searchParams.get('username');
  const email = searchParams.get('email');
  
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET}) as unknown as UserPayload;

  if (!token) {
    return new Response(JSON.stringify({ message: 'Unauthorized'}), { status: 403 });
  }

  const error = userMiddleware.handlePatch(searchParams);
  if (error) return error;

  try {
    const newUser = await prisma.users.update({
      where: {
        id: token.id
      },
      data: {
        name: username || undefined,
        email: email || undefined
      },
      include: {
        skin: true,
        role: true
      }
    });
    return new Response(JSON.stringify({ message: 'Succès', username: newUser.name, email: newUser.email }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Un problème est survenu'}), { status: 500 });
  }

}