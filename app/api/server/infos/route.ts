import prisma from "@/app/lib/db";
import { ServerInfo } from "@prisma/client";

export async function GET() {
  const dummyResponse: ServerInfo = {
    id: 0,
    status: 'OFFLINE',
    ip: "",
    onlinePlayers: 0
  };
  try {
    const data = await prisma.serverInfo.findUnique({
      where: {
        id: 1
      }
    });

    if (data == null) {
      return new Response(JSON.stringify(dummyResponse), { status: 500 });
    }
    
    const serverInfo: ServerInfo = { ...data };

    return new Response(JSON.stringify(serverInfo), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify(dummyResponse), { status: 500 });
  }
}