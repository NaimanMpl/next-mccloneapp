import { AddRoleFormData } from '../models/formsdata.model';

class RoleMiddleware {
  public verifyRoleName = (formData: AddRoleFormData) => {
    if (!formData.name) {
      return new Response(
        JSON.stringify({ message: 'Veuillez saisir un nom de role' }),
        { status: 400 }
      );
    }

    return null;
  };
}

const roleMiddleware = new RoleMiddleware();

export default roleMiddleware;
