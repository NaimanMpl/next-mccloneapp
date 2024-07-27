import { AddPermissionFormData } from '../models/formsdata.model';

class PermissionMiddleware {
  public verifyPermissionAttributes = (permission: AddPermissionFormData) => {
    if (!permission.name) {
      return new Response(
        JSON.stringify({ message: 'Veuillez saisir un nom de permisison ' }),
        { status: 400 }
      );
    }

    if (!permission.author) {
      return new Response(
        JSON.stringify({ message: 'Veuillez saisir un auteur ' }),
        { status: 400 }
      );
    }

    if (!permission.author.id) {
      return new Response(
        JSON.stringify({ message: 'Veuillez saisir un auteur ' }),
        { status: 400 }
      );
    }

    if (!permission.role) {
      return new Response(
        JSON.stringify({ message: 'Veuillez saisir un role ' }),
        { status: 400 }
      );
    }

    if (!permission.role.id) {
      return new Response(
        JSON.stringify({ message: 'Veuillez saisir un role ' }),
        { status: 400 }
      );
    }

    return null;
  };

  public verifyRoleIdParam = (roleId: string | null) => {
    if (Number.isNaN(roleId)) {
      return new Response(
        JSON.stringify({ message: 'Veuillez saisir un role' })
      );
    }

    return null;
  };

  public verifyPermissionIdParam = (permissionId: string | null) => {
    if (Number.isNaN(permissionId)) {
      return new Response(
        JSON.stringify({ message: 'Veuillez saisir une permission' })
      );
    }

    return null;
  };
}

const permissionMiddleware = new PermissionMiddleware();

export default permissionMiddleware;
