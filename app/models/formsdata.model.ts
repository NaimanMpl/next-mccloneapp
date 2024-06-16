import { RoleEnum } from "./role.model"

export interface EditUserFormData {
  email?: string,
  name?: string,
  userRole?: string,
  admin?: boolean
}

export interface AddUserFormData {
  email: string,
  username: string,
  role: RoleEnum,
  password: string,
  confirmPassword: string,
  admin: boolean
}

export interface AddPermissionFormData {
  name: string,
  author: {
    id: string
  },
  role: {
    id: number
  }
}