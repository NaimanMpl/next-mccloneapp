import { RoleData } from "../models/role.model";

export const getRolesAndTheirUsers = async (): Promise<RoleData[]> => {
  const res = await fetch(
    '/api/roles/',
    {
      method: 'GET'
    }
  );

  if (!res.ok) {
    throw new Error();
  }

  return await res.json();;
}