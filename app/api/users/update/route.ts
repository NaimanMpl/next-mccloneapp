import UserController from "@/app/controllers/user.controller";
import { EditUserFormData } from "@/app/models/formsdata.model";

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const userId = searchParams.get('id');

  if (!userId) {
    return new Response(JSON.stringify({ message: "Veuillez saisir un ID d'utilisateur !" }), { status: 400 });
  }

  const formData = await request.json() as EditUserFormData;
  const userController = new UserController();

  try {
    const newUser = await userController.updateUser(userId, formData);
    return new Response(JSON.stringify({ message: 'Success', user: {...newUser, password: undefined} }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Une erreur est survenue.' }), { status: 500 });
  }

}