import prisma from '@/app/lib/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import crypto from 'crypto';

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
