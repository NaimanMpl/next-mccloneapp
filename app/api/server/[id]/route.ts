import { ServerStatus } from '@prisma/client';
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
    const id = parseInt(params.id);
    const data: { onlinePlayers?: number, status?: ServerStatus } = await request.json();

    const server = await prisma.server.update({
      where: {
        id: id,
      },
      data: {
        onlinePlayers: data.onlinePlayers,
        status: data.status
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
