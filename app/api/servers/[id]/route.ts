import { UserPayload } from '@/app/models/user.model';
import logger from '@/app/utils/logger';
import { ServerStatus } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import prisma from '../../../lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Le serveur n'existe pas." }),
        { status: 404 }
      );
    }

    const server = await prisma.server.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        chatMessages: true,
      },
    });

    if (server == null) {
      return new Response(
        JSON.stringify({ message: "Le serveur n'existe pas." }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(server), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème.' }),
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const authorization = headersList.get('Authorization');

    if (!authorization) {
      return new Response(
        JSON.stringify({ message: "Aucun jeton d'authentification trouvé." }),
        { status: 401 }
      );
    }

    const authorizationValueList = authorization.split(' ');

    if (authorizationValueList.length < 2) {
      return new Response(
        JSON.stringify({ message: "Jeton d'authentification invalide" }),
        { status: 403 }
      );
    }

    const authTokenValue = authorizationValueList[1];
    const id = parseInt(params.id);

    const data: { onlinePlayers?: number; status?: ServerStatus } =
      await request.json();

    const server = await prisma.server.update({
      where: {
        id: id,
        authToken: {
          token: authTokenValue,
        },
      },
      data: {
        onlinePlayers: data.onlinePlayers,
        status: data.status,
        lastUpdate: new Date(),
      },
      include: {
        chatMessages: true,
      },
    });

    if (!server) {
      return new Response(JSON.stringify({ message: 'Non autorisé.' }), {
        status: 403,
      });
    }

    return new Response(JSON.stringify(server), { status: 200 });
  } catch (e) {
    logger.error(e);
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème.' }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const token = (await getToken({
    req: request as NextRequest,
    secret: process.env.NEXTAUTH_SECRET,
  })) as unknown as UserPayload;

  if (!token || !token.admin) {
    return new Response(JSON.stringify({ message: 'Non autorisé.' }), {
      status: 403,
    });
  }

  try {
    const server = await prisma.server.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify(server));
  } catch (e) {
    logger.error(e);
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème.' }),
      { status: 500 }
    );
  }
}
