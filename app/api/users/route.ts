import prisma from "@/app/lib/db";
import logger from "@/app/utils/logger";

export async function GET(request: Request) {
  try {
    const users = await prisma.users.findMany({
      include: {
        role: true,
        skin: true
      }
    });

    return new Response(JSON.stringify(users.map(user => ({ ...user, password: undefined }))), { status: 200 });
  } catch (e) {
    logger.error(e)
    return new Response(JSON.stringify([]), { status: 500 });
  }
}