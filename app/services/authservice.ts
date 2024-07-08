import axios from "axios";
import { LoginFormData } from "../hooks/useLoginForm";
import { RegisterFormData } from "../hooks/useRegisterForm";
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
    await axios.post('/api/auth/login', formData);
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message)
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