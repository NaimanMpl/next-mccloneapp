import { RoleEnum } from './role.model';

export interface EditUserFormData {
  email?: string;
  name?: string;
  userRole?: string;
  admin?: boolean;
}

export interface AddUserFormData {
  email: string;
  username: string;
  role: RoleEnum;
  password: string;
  confirmPassword: string;
  admin: boolean;
}

export interface AddPermissionFormData {
  name: string;
  author: {
    id: string;
  };
  role: {
    id: number;
  };
}

export interface AddRoleFormData {
  name: string;
}

export interface EditUsernameFormData {
  username: string;
}

export interface EditEmailFormData {
  email: string;
}

export interface EditPasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AddServerFormData {
  ip: string;
  port: number;
  primary: boolean;
}
