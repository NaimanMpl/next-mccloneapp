import prisma from "@/app/lib/db";
import roleMiddleware from "@/app/middlewares/role.middleware";
import { AddRoleFormData } from "@/app/models/formsdata.model";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET(request: Request) {
  try {
    const rolesAndUsers = await prisma.role.findMany({
      include: {
        Users: true,
        permissions: {
          include: {
            author: true
          }
        }
      }
    });
    return new Response(
      JSON.stringify(rolesAndUsers.map(roleData => ({
        ...roleData,
        Users: undefined,
        permissions: roleData.permissions.map(permission => ({...permission, author: {...permission.author, password: undefined }})),
        users: roleData.Users.map(user => ({...user, password: undefined }))
      }))), 
      { status: 200 }
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue.' }), { status: 500 });
  }
}

export async function POST(request: Request) {
  const role = await request.json() as AddRoleFormData;
  const error = roleMiddleware.verifyRoleName(role);

  if (error) return error;

  try {
    const newRole = await prisma.role.create({
      data: {
        name: role.name,
        score: 0
      },
      include: {
        Users: true,
        permissions: {
          include: {
            author: true
          }
        }
      }
    });
    return new Response(JSON.stringify({ message: 'Success', role: {
      ...newRole,
      Users: undefined,
      permissions: newRole.permissions.map(permission => ({...permission, author: {...permission.author, password: undefined }})),
      users: newRole.Users.map(user => ({...user, password: undefined }))
    }}));
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return new Response(JSON.stringify({ message: 'Ce role existe déjà '}), { status: 400 });
    }
    return new Response(JSON.stringify({ message: 'Oops.. Un problème est survenue' }), { status: 500 });
  }
}