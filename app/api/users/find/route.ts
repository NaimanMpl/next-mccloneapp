import prisma from "@/app/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  if (!searchParams.has('username') && !searchParams.has('email')) {
    return new Response(JSON.stringify({ message: 'Veuillez renseigner une adresse mail ou un pseudo' }), { status: 400 });
  }

  if (searchParams.has('username')) {
    const username = searchParams.get('username')!;
    const user = await prisma.users.findFirst({
      where: {
        name: username,
      }
    });
    return new Response(JSON.stringify({ user: user != null }), { status: 200 });
  } else if (searchParams.has('email')) {
    const email = searchParams.get('email')!;
    const user = await prisma.users.findFirst({
      where: {
        email: email
      }
    });
    return new Response(JSON.stringify({ user: user != null }), { status: 200 });
  }

}