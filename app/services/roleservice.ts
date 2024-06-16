import { AddPermissionFormData } from "../models/formsdata.model";
import { Permission } from "../models/permission.model";
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

export const addPermission = async (formData: AddPermissionFormData): Promise<Permission> => {
  const res = await fetch(
    '/api/roles/permissions',
    {
      method: 'POST',
      body: JSON.stringify(formData)
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.permission;
}

export const deletePermission = async (permissionId: number) => {
  const res = await fetch(
    `/api/roles/permissions?id=${permissionId}`,
    {
      method: 'DELETE'
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
}