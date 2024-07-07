import axios from "axios";
import { AddPermissionFormData, AddRoleFormData } from "../models/formsdata.model";
import { Permission } from "../models/permission.model";
import { RoleData } from "../models/role.model";

export const getRolesAndTheirUsers = async (): Promise<RoleData[]> => {
  try {
    const { data } = await axios.get('/api/roles');
    return data;
  } catch (e) {
    return [];
  }
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

export const addRole = async (formData: AddRoleFormData): Promise<RoleData> => {
  try {
    const { data } = await axios.post<{ role: RoleData, message: string }>('/api/roles', formData);
    
    if (data.message) {
      throw new Error(data.message);
    }
  
    return data.role;
  } catch (e) {
    throw new Error('Le serveur a rencontré un problème.');
  }
}