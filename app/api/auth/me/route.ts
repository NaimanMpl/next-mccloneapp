import prisma from '@/app/lib/db';
import userMiddleware from '@/app/middlewares/user.middleware';
import { cookies } from "next/headers";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const clientCookies = cookies();
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
        name: username!
      }
    });
    console.log(newUser)
    return new Response(JSON.stringify({ message: 'Succès', username: newUser.name }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Un problème est survenu'}), { status: 500 });
  }

}