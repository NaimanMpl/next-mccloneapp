import UserController from '@/app/controllers/user.controller';
import userMiddleware from '@/app/middlewares/user.middleware';
import { AddUserFormData } from '@/app/models/formsdata.model';

export async function POST(request: Request) {
  const user = (await request.json()) as AddUserFormData;
  const error = userMiddleware.handleUserCreation(user);

  if (error) {
    return error;
  }

  try {
    const userController = new UserController();
    const newUser = await userController.addUser(user);

    return new Response(
      JSON.stringify({
        message: 'Success',
        user: { ...newUser, password: undefined },
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ message: 'Une erreur est survenue.' }),
      { status: 500 }
    );
  }
}
