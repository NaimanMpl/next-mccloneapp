import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();
const DEFAULT_ROLES: Role[] = [
  {
    id: 2,
    name: 'Administrateur',
    score: 100
  },
  {
    id: 1,
    name: 'Joueur',
    score: 0
  }
]

const initDatabaseRoles = async () => {
  try {
    for (const defaultRole of DEFAULT_ROLES) {
      const findRole = await prisma.role.findFirst({ where: { name: defaultRole.name }});
      if (findRole !== null) continue;
      await prisma.role.create({
        data: defaultRole
      });
      console.log('Le rôle ' + defaultRole.name + ' a été crée.');
    };
  } catch (e) {
    console.error(e);
  }
}

initDatabaseRoles();