import prisma from '@/app/lib/db';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const headersList = headers();
  const authorization = headersList.get('Authorization');

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
  const authTokenValue = authorizationValueList[1];

  try {
    const authToken = await prisma.authToken.findUnique({
      where: {
        token: authTokenValue,
      },
      include: {
        server: true,
      },
    });

    if (!authToken) {
      return new Response(JSON.stringify({ message: 'Token invalide' }), {
        status: 403,
      });
    }

    const server = await prisma.server.findUnique({
      where: {
        id: authToken.serverId,
      },
      include: {
        chatMessages: true,
      },
    });

    return new Response(JSON.stringify(server), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème' }),
      { status: 500 }
    );
  }
}
