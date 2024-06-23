import { User } from "../models/user.model";

export const UserPayloadFactory = (user: User) => {
  return { 
    id: user.id, 
    email: user.email, 
    name: user.name, 
    skin: user.skin.link, 
    role: user.role, 
    admin: user.admin 
  };
}