import React, { useState } from "react";
import { z } from 'zod';
import { isEmailAvailable, isUsernameAvailable, registerUser } from "../services/authservice";
import logger from "../utils/logger";


export interface RegisterFormData {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

export const useRegisterForm = () => {
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const formSchema = z.object({
    username: z
    .string()
    .min(2, { message: "Le nom d'utilisateur doit avoir au moins 2 caractères" })
    .max(20, { message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères" }),
    email: z.string().email({ message: 'Veuillez renseigner une adresse mail valide '}),
    password: z.string().min(8, { message: 'Le mot de passe doit au moins contenir 8 caractères '}),
    confirmPassword: z.string().min(8, { message: 'Le mot de passe doit au moins contenir 8 caractères '})
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passes doivent correspondre.',
    path: ['confirmPassword']
  }).refine(async (data) => await isEmailAvailable(data.email), {
    message: "Aïe, cette adresse mail n'est pas disponible...",
    path: ['email']
  }).refine(async (data) => await isUsernameAvailable(data.username), {
    message: "Aïe, ce nom d'utilisateur n'est pas disponible...",
    path: ['username']
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await registerUser(values as RegisterFormData);
      setLoading(false);
      window.location.href = '/login';
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }
  return { formSchema, onSubmit, loading, error }
}