import { UserPayloadFactory } from '@/app/factories/userpayload.factory';
import { updateTokens } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import userMiddleware from '@/app/middlewares/user.middleware';
import { User, UserPayload } from '@/app/models/user.model';
import logger from '@/app/utils/logger';
import { cookies } from "next/headers";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const user = await userMiddleware.handleAuth(request);

  if (user instanceof Response) {
    return user as Response;
  }

  return new Response(JSON.stringify(user), { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const user = await userMiddleware.handleAuth(request);
  const username = searchParams.get('username');
  const email = searchParams.get('username');

  if (user instanceof Response) {
    return user as Response;
  }

  const error = userMiddleware.handlePatch(searchParams);
  if (error) return error;

  try {
    const newUser = await prisma.users.update({
      where: {
        id: user.id
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
    const payload = await UserPayloadFactory(newUser as User);
    await updateTokens(payload);
    return new Response(JSON.stringify({ message: 'Succès', username: newUser.name }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Un problème est survenu'}), { status: 500 });
  }

}