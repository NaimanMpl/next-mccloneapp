import { AddChatMessageFormData } from '@/app/models/formsdata.model';
import prisma from '@/app/lib/db';
import logger from '@/app/utils/logger';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const data: AddChatMessageFormData = await request.json();
  const headersList = headers();
  const authorization = headersList.get('Authorization');
  try {
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
    const authToken = await prisma.authToken.findFirst({
      where: {
        token: authTokenValue,
      },
      include: {
        server: true,
      },
    });

    if (!authToken) {
      return new Response(
        JSON.stringify({ message: "Jeton d'authentification invalide" }),
        { status: 403 }
      );
    }

    if (!authToken.server) {
      return new Response(
        JSON.stringify({ message: "Le token n'est associé à aucun serveur." }),
        { status: 401 }
      );
    }

    const chatMessage = await prisma.chatMessage.create({
      data: {
        message: data.message,
        authorId: data.authorId,
        serverId: authToken.server.id,
      },
      include: {
        author: true,
      },
    });

    return new Response(
      JSON.stringify({
        ...chatMessage,
        author: {
          ...chatMessage.author,
          password: undefined,
        },
      }),
      { status: 200 }
    );
  } catch (e) {
    logger.error(e);
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème.' }),
      { status: 500 }
    );
  }
}
