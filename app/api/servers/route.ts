import prisma from '@/app/lib/db';
import { AddServerFormData } from '@/app/models/formsdata.model';
import { UserPayload } from '@/app/models/user.model';
import logger from '@/app/utils/logger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import crypto from 'crypto';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  const data: AddServerFormData = await request.json();

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
    const primaryServer = await prisma.server.findFirst({
      where: {
        primary: true,
      },
    });

    if (primaryServer && data.primary) {
      return new Response(
        JSON.stringify({ message: 'Un serveur primaire existe déjà' }),
        { status: 400 }
      );
    }

    const server = await prisma.server.create({
      data: {
        ip: data.ip,
        port: data.port,
        primary: data.primary,
        onlinePlayers: 0,
        status: 'OFFLINE',
        authToken: {
          create: {
            token: crypto.randomBytes(48).toString('hex'),
          },
        },
      },
      include: {
        chatMessages: true,
      },
    });

    return new Response(JSON.stringify(server), { status: 200 });
  } catch (e) {
    logger.error(e);
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002')
        return new Response(
          JSON.stringify({ message: 'Le serveur existe déjà.' }),
          { status: 400 }
        );
    }
    return new Response(
      JSON.stringify({ message: 'Un problème est survenu.' }),
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const primary = searchParams.get('primary');
  try {
    const token = (await getToken({
      req: request as NextRequest,
      secret: process.env.NEXTAUTH_SECRET,
    })) as unknown as UserPayload;
    const now = new Date();
    const servers = await prisma.server.findMany({
      include: {
        authToken: true,
        chatMessages: true,
      },
    });

    const primaryServer = await prisma.server.findFirst({
      where: {
        primary: true,
      },
      include: {
        chatMessages: true,
      },
    });

    if (primary) {
      if (primaryServer) {
        return new Response(JSON.stringify(primaryServer), { status: 200 });
      }
      return new Response(
        JSON.stringify({ message: 'Aucun serveur primaire trouvé.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify(
        servers.map((server) => ({
          ...server,
          token: token && token.admin ? server.authToken?.token : undefined,
          authToken: undefined,
          authTokenId: undefined,
          status:
            (now.getTime() - new Date(server.lastUpdate).getTime()) / 1000 <= 60
              ? 'ONLINE'
              : 'OFFLINE',
        }))
      ),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème.' }),
      { status: 500 }
    );
  }
}
