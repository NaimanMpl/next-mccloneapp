import { EnumDictionnary } from "@/lib/utils";

export enum RoleEnum {
  Administrateur = 'Administrateur',
  Joueur = 'Joueur'
}

export const RolesDict: EnumDictionnary<RoleEnum, number> = {
  [RoleEnum.Joueur] : 1,
  [RoleEnum.Administrateur] : 2
}