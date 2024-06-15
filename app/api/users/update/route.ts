
export async function PUT(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const userId = searchParams.get('id');

  if (!userId) {
    return new Response(JSON.stringify({ message: "Veuillez saisir un ID d'utilisateur !" }), { status: 400 });
  }

  const newUser = await request.json();

  return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
}