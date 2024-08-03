import prisma from '@/app/lib/db';
import { UserPayload } from '@/app/models/user.model';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import crypto from 'crypto';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const ip = forwardedFor.split(',')[0].trim();
  const ipv4MappedRegex = /^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/;
  const match = ipv4MappedRegex.exec(ip);
  const finalIp = match ? match[1] : ip;

  try {
    const server = await prisma.server.create({
      data: {
        ip: finalIp,
        onlinePlayers: 0,
        status: 'ONLINE',
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
  const token = (await getToken({
    req: request as NextRequest,
    secret: process.env.NEXTAUTH_SECRET,
  })) as unknown as UserPayload;

  if (!token || !token.admin) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 403,
    });
  }

  try {
    const now = new Date();
    const servers = await prisma.server.findMany({
      include: {
        authToken: true,
      },
    });
    return new Response(
      JSON.stringify(
        servers.map((server) => ({
          ...server,
          token: server.authToken?.token,
          authToken: undefined,
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
