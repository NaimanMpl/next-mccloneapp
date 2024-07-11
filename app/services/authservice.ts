import axios from "axios";
import { signIn } from 'next-auth/react';
import { LoginFormData } from "../hooks/useLoginForm";
import { RegisterFormData } from "../hooks/useRegisterForm";
import { AuthentificationError } from "../models/error.model";
import { UserPayload } from "../models/user.model";

export const registerUser = async (formData: RegisterFormData) => {
  try {
    await axios.post('/api/auth/register', formData);
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    }
    throw new Error('Le serveur a rencontré un problème.');
  }
}

export const loginUser = async (formData: LoginFormData) => {
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false
    });
    
    if (!response) {
      throw new AuthentificationError('Le serveur a rencontré un problème.');
    }

    if (!response.ok) {
      throw new AuthentificationError('Email ou mot de passe incorrect.');
    }

  } catch (e: any) {

    if (e instanceof AuthentificationError) {
      throw new Error(e.message);
    }

    throw new Error('Le serveur a rencontré un problème.');
  }
}

export const getCurrentUser = async (): Promise<UserPayload | null> => {
  try {
    const { data } = await axios.get<UserPayload>('/api/auth/me');
    return data;
  } catch (e) {
    return null;
  }
}

export const isUsernameAvailable = async (username: string): Promise<boolean> => {
  const res = await fetch(
    `/api/users/find?username=${username}`,
    {
      method: 'GET'
    }
  );

  if (!res.ok) {
    return false;
  }
  const data = await res.json();

  return !data.user;
}

export const isEmailAvailable = async (email: string): Promise<boolean> => {
  const res = await fetch(
    `/api/users/find?email=${email}`,
    {
      method: 'GET'
    }
  );

  if (!res.ok) {
    return false;
  }
  const data = await res.json();

  return !data.user;
}