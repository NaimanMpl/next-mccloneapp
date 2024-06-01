import { RegisterFormData } from "@/app/hooks/useRegisterForm";
import logger from "@/app/utils/logger";
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from 'bcrypt';

export default class UserController {
  
  public createUser = async (userFormData: RegisterFormData) => {
    const prisma = new PrismaClient();

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
          }
        }
      });

      return user;
      logger.trace(`User ${userFormData.username} (${userFormData.email}) has been created successfully`);
    } catch(e) {
      throw e;
    } finally {
      await prisma.$disconnect();
    }
  }

  public getUsers = async () => {

    const prisma = new PrismaClient();
    const users = await prisma.users.findMany();
    
    console.log(users);
  }

}