import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { RegisterFormData } from "../hooks/useRegisterForm";
import { isAuthenticated } from "../lib/auth";
import { AddUserFormData } from "../models/formsdata.model";
import { RoleEnum } from "../models/role.model";

const emailRegex = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/;

class UserMiddleware {

  public handleRegister = (user: RegisterFormData): Response | null => {
    
    if (!user.username || !user.email || !user.password || !user.confirmPassword) {
      return new Response(JSON.stringify({ message: 'Veuillez renseigner tout les champs.' }), { status: 400 });
    }
  
    if (user.username.length === 0 || user.email.length === 0 || user.password.length === 0 || user.confirmPassword.length === 0) {
      return new Response(JSON.stringify({ message: 'Veuillez renseigner tout les champs.' }), { status: 400 });
    }
  
    if (user.password !== user.confirmPassword) {
      return new Response(JSON.stringify({ message: 'Les 2 mots de passes doivent être identiques.' }), { status: 400 });
    }
  
    if (!emailRegex.test(user.email)) {
      return new Response(JSON.stringify({ message: 'Veuillez renseigner une adresse email valide !'}), { status: 400 });
    }

    return null;
  }

  public handleUserCreation = (user: AddUserFormData) => {
    
    if (this.handleRegister(user)) {
      return this.handleRegister(user);
    }

    if (!(user.role in RoleEnum)) {
      return new Response(JSON.stringify({ message: 'Role inconnu' }), { status: 400 });
    }

    if (typeof(user.admin) !== 'boolean') {
      return new Response(JSON.stringify({ message: 'Le champ admin doit être un booleen'}), { status: 400 });
    }

    return null;

  }

  public handleAuth = async (request: NextRequest) => {
    const clientCookies = cookies();
    const user = await isAuthenticated(request, clientCookies);

    if (!user) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
    }

    return user;
  }

  public handlePatch = (searchParams: URLSearchParams) => {
    const username = searchParams.get('username');
    const email = searchParams.get('email');

    if (!email && !username) {
      return new Response(JSON.stringify({ message: 'Veuillez saisir au moins un champ !'}), { status: 400 });
    }

    if (username) {
      if (username.length < 2 || username.length > 20) {
        return new Response(JSON.stringify({ message: "Veuillez saisir un nom d'utilisateur dont la taille est comprise entre 2 et 20"}), { status: 400 });
      }
    }


    if (email) {
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({ message: 'Veuillez renseigner une adresse email valide !'}), { status: 400 });
      }
    }

    return null;
  }
}

const userMiddleware = new UserMiddleware();

export default userMiddleware;