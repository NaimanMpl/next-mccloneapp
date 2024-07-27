import UserController from '@/app/controllers/user.controller';
import { RegisterFormData } from '@/app/hooks/useRegisterForm';
import userMiddleware from '@/app/middlewares/user.middleware';
import logger from '@/app/utils/logger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(request: Request) {
  const user: RegisterFormData = await request.json();
  const error = userMiddleware.handleRegister(user);

  if (error) {
    return error;
  }

  try {
    const userController = new UserController();
    const userData = await userController.createUser(user);

    const payload = {
      id: userData.id,
      username: userData.name,
      email: userData.email,
    };

    return new Response(
      JSON.stringify({ user: payload, message: 'Registered' }),
      { status: 200 }
    );
  } catch (e) {
    logger.error(e);

    if (e instanceof PrismaClientKnownRequestError) {
      return new Response(
        JSON.stringify({ message: 'Une erreur est survenue.' }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Une erreur est survenue.' }),
      { status: 500 }
    );
  }
}
