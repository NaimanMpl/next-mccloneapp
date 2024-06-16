import prisma from "@/app/lib/db";
import permissionMiddleware from "@/app/middlewares/permission.middleware";
import { AddPermissionFormData } from "@/app/models/formsdata.model";
import { Permission } from "@/app/models/permission.model";
import logger from "@/app/utils/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(request: Request) {

  const permissionData: AddPermissionFormData = await request.json();
  const missingAttributes = permissionMiddleware.verifyPermissionAttributes(permissionData)
  
  if (missingAttributes) {
    return missingAttributes;
  }

  try {
    const permission = await prisma.permission.create({
      data: {
        name: permissionData.name,
        authorId: permissionData.author.id,
        roleId: permissionData.role.id
      },
      include: {
        author: true,
        role: true
      }
    });
    
    return new Response(JSON.stringify({ message: 'Success', permission: {
      ...permission,
      author: {
        ...permission.author,
        password: undefined
      }
    } }));
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return new Response(JSON.stringify({ message: 'Cette permission existe déjà' }));
    }
    logger.error(e);
    return new Response(JSON.stringify({ message: 'Oops.. Un problème est survenue' }));
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const roleId = searchParams.get('id');

  if (!roleId) {
    return new Response(JSON.stringify({ message: 'Veuillez saisir un role '}));
  }

  const error = permissionMiddleware.verifyRoleIdParam(roleId);

  if (error) {
    return error;
  }

  try {
    const permissions = await prisma.permission.findMany({
      where: {
        roleId: parseInt(roleId)
      },
      include: {
        author: true
      }
    });

    return new Response(JSON.stringify(permissions.map(permission => ({...permission, author: { ...permission.author, password: undefined }}))));
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue '}), { status: 500 });
  }
}