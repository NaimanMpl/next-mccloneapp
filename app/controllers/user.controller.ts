import { RegisterFormData } from "@/app/hooks/useRegisterForm";
import logger from "@/app/utils/logger";
import bcrypt from 'bcrypt';
import prisma from "../lib/db";
import { EditUserFormData } from "../models/formsdata.model";
import { RoleEnum, RolesDict } from "../models/role.model";
export default class UserController {
  
  public createUser = async (userFormData: RegisterFormData) => {

    try {
      
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userFormData.password, salt);

      const user = await prisma.users.create({
        data: {
          name: userFormData.username,
          email: userFormData.email,
          password: hashedPassword,
          skin: {
            create: {
                link: process.env.DEFAULT_SKIN_URL!,
            }
          },
          roleId: 1
        }
      });

      logger.trace(`User ${userFormData.username} (${userFormData.email}) has been created successfully`);
      return user;
    } catch(e) {
      throw e;
    } finally {
      await prisma.$disconnect();
    }
  }

  public getUsers = async () => {

    const users = await prisma.users.findMany();
    
    console.log(users);
  }

  public updateUser = async (id: string, formData: EditUserFormData) => {

    const { email, name, userRole, admin } = formData;

    try {
      const user = await prisma.users.update({
        where: {
          id: id
        },
        data: {
          admin: admin,
          email: email,
          name: name,
          roleId: RolesDict[userRole as RoleEnum]
        },
        include: {
          role: true,
          skin: true
        }
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

}