import { Role, User } from "./user.model";

export interface Permission {
  id: number,
  name: string,
  author: User,
  role: Role
}