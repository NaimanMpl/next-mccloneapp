import prisma from '@/app/lib/db';
import { ServerInfo } from '@/app/models/serverinfo.model';

export async function GET() {
  try {
    const data = await prisma.serverInfo.findUnique({
      where: {
        id: 1,
      },
    });

    if (data == null) {
      return new Response(
        JSON.stringify({ message: "Le serveur n'existe pas." }),
        { status: 404 }
      );
    }

    const totalUsers = await prisma.users.count();
    const serverInfo: ServerInfo = { ...data, totalPlayers: totalUsers };

    return new Response(JSON.stringify(serverInfo), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème.' }),
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const serverInfo: ServerInfo = await request.json();
    const updatedServerInfo = await prisma.serverInfo.update({
      where: {
        id: serverInfo.id,
      },
      data: {
        onlinePlayers: serverInfo.onlinePlayers,
        status: serverInfo.status,
      },
    });
    return new Response(JSON.stringify(updatedServerInfo), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: 'Le serveur a rencontré un problème.' }),
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  return new Response(JSON.stringify({}), { status: 200 });
}
