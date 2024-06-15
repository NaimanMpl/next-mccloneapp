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

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const userId = searchParams.get('id');
  
  if (!userId) {
    return new Response(JSON.stringify({ message: "Veuillez saisir un identifiant d'utilisateur" }), { status: 400 });
  }

  try {
    const user = await prisma.users.delete({
      where: {
        id: userId
      }
    });
    return new Response(JSON.stringify({ message: 'Success', user: { id: user.id, name: user.name }}), { status: 200 });
  } catch (e) {
    logger.error(e)
    return new Response(JSON.stringify({ message: 'Une erreur est survenue '}), { status: 500 });
  }
}