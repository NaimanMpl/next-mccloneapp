import { ServerStatus } from '@prisma/client';
import { headers } from 'next/headers';
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

    const authToken = await prisma.authToken.findUnique({
      where: {
        token: authTokenValue,
        serverId: id,
      },
      include: {
        server: true,
      },
    });

    if (!authToken) {
      return new Response(JSON.stringify({ message: 'Non autorisé' }), {
        status: 403,
      });
    }

    const data: { onlinePlayers?: number; status?: ServerStatus } =
      await request.json();

    const server = await prisma.server.update({
      where: {
        id: id,
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

    return new Response(JSON.stringify(server), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème.' }),
      { status: 500 }
    );
  }
}
