import prisma from '@/app/lib/db';
import { User, UsersPagination } from '@/app/models/user.model';
import logger from '@/app/utils/logger';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const pageParam = searchParams.get('page');
  let page = pageParam ? parseInt(pageParam) : 1;
  page = page > 0 ? page : 1;

  try {
    const users = await prisma.users.findMany({
      skip: (page - 1) * 20,
      take: 20,
      include: {
        role: true,
        skin: true,
      },
    });
    const totalUsers = await prisma.users.count();
    const nextPageUrl = `/api/users?page=${totalUsers - page * 20 > 0 ? page + 1 : page}`;
    const usersPagination: UsersPagination = {
      total: totalUsers,
      nextPage: nextPageUrl,
      users: users.map((user) => ({ ...user, password: undefined }) as User),
    };

    return new Response(JSON.stringify(usersPagination), { status: 200 });
  } catch (e) {
    logger.error(e);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const userId = searchParams.get('id');
  const token = await getToken({
    req: request as NextRequest,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!userId) {
    return new Response(
      JSON.stringify({
        message: "Veuillez saisir un identifiant d'utilisateur",
      }),
      { status: 400 }
    );
  }

  if (token && token.id === userId) {
    return new Response(
      JSON.stringify({ message: "Impossible d'effectuer cette opération." }),
      { status: 401 }
    );
  }

  try {
    const currentUser = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!currentUser || currentUser.admin) {
      return new Response(
        JSON.stringify({ message: "Impossible d'effectuer cette opération." }),
        { status: 401 }
      );
    }

    const user = await prisma.users.delete({
      where: {
        id: userId,
      },
    });

    return new Response(
      JSON.stringify({
        message: 'Success',
        user: { id: user.id, name: user.name },
      }),
      { status: 200 }
    );
  } catch (e) {
    logger.error(e);
    return new Response(
      JSON.stringify({ message: 'Une erreur est survenue ' }),
      { status: 500 }
    );
  }
}
