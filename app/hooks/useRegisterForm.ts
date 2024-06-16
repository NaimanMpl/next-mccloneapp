import React, { useState } from "react";
import { z } from 'zod';
import { registerUser } from "../services/authservice";
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
    password: z.string().min(2, { message: 'Le mot de passe doit au moins contenir 2 caractères '}),
    confirmPassword: z.string().min(2, { message: 'Le mot de passe doit au moins contenir 2 caractères '})
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await registerUser(values as RegisterFormData);
      setLoading(false);
      window.location.href = '/login';
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message ? e.message : 'Le serveur a rencontré un problème.');
        logger.error(e.message);
      } else {
        setError('Le serveur a rencontré un problème.');
        logger.error('Unexpected error : ', e);
      }
      setLoading(false);
    }
  }
  return { formSchema, onSubmit, loading, error }
}