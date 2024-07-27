import prisma from '@/app/lib/db';
import { ServerInfo } from '@/app/models/serverinfo.model';

export async function GET() {
  const dummyResponse: ServerInfo = {
    id: 0,
    status: 'OFFLINE',
    ip: '',
    onlinePlayers: 0,
    totalPlayers: 0,
  };
  try {
    const data = await prisma.serverInfo.findUnique({
      where: {
        id: 1,
      },
    });

    if (data == null) {
      return new Response(JSON.stringify(dummyResponse), { status: 201 });
    }

    const totalUsers = await prisma.users.count();
    const serverInfo: ServerInfo = { ...data, totalPlayers: totalUsers };

    return new Response(JSON.stringify(serverInfo), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify(dummyResponse), { status: 201 });
  }
}
