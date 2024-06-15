import { boolean } from "zod";
import { RegisterFormData } from "../hooks/useRegisterForm";
import { AddUserFormData } from "../models/formsdata.model";
import { RoleEnum } from "../models/role.model";

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
  
    const emailRegex = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/;
  
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
}

export default new UserMiddleware();