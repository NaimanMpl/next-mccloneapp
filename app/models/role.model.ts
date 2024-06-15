import { EnumDictionnary } from "@/lib/utils";
import { Role, User } from "./user.model";

export interface RoleData {
  id: number,
  name: string,
  score: number,
  users: User[]
}

export enum RoleEnum {
  Administrateur = 'Administrateur',
  Joueur = 'Joueur'
}

export const RolesDict: EnumDictionnary<RoleEnum, number> = {
  [RoleEnum.Joueur] : 1,
  [RoleEnum.Administrateur] : 2
}