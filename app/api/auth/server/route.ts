import prisma from '@/app/lib/db';
import logger from '@/app/utils/logger';
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
  const authToken = authorizationValueList[1];

  try {
    const authTokenRecord = await prisma.authToken.findUnique({
      where: {
        token: authToken,
      },
    });

    if (!authTokenRecord) {
      return new Response(JSON.stringify({ message: 'Token invalide' }), {
        status: 403,
      });
    }

    const server = await prisma.server.findUnique({
      where: {
        authTokenId: authTokenRecord.id,
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
    logger.error(e);
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème' }),
      { status: 500 }
    );
  }
}
