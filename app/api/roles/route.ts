import prisma from "@/app/lib/db";

export async function GET(request: Request) {
  try {
    const rolesAndUsers = await prisma.role.findMany({
      include: {
        Users: true
      }
    });
    return new Response(
      JSON.stringify(rolesAndUsers.map(roleData => ({
        ...roleData,
        Users: undefined,
        users: roleData.Users.map(user => ({...user, password: undefined }))
      }))), 
      { status: 200 }
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue.' }), { status: 500 });
  }

}