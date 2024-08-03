import prisma from '@/app/lib/db';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const headersList = headers();
  const authorization = headersList.get('Authorization');
  const data: { serverId: number } = await request.json();

  if (!authorization) {
    return new Response(JSON.stringify({ message: 'Non authentifié' }), {
      status: 401,
    });
  }

  const authorizationValueList = authorization.split(' ');
  if (authorizationValueList.length < 2) {
    return new Response(JSON.stringify({ message: 'Token invalide' }), {
      status: 403,
    });
  }
  const authToken = authorizationValueList[1];

  try {
    const server = await prisma.server.findUnique({
      where: {
        id: data.serverId,
        authToken: {
          token: authToken,
        },
      },
      include: {
        chatMessages: true,
      },
    });

    if (!server) {
      return new Response(JSON.stringify({ message: 'Non autorisé' }), {
        status: 403,
      });
    }

    return new Response(JSON.stringify(server), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème' }),
      { status: 500 }
    );
  }
}
