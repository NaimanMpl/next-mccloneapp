import React, { useState } from "react";
import { z } from "zod";
import { loginUser } from "../services/authservice";

export interface LoginFormData {
  email: string,
  password: string
}

export const useLoginForm = () => {
  
  const formSchema = z.object({
    email: z.string(),
    password: z.string()
  });
  const [ error, setError ] = useState('');

  const [ loading, setLoading ] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setLoading(true);
      await loginUser(values as LoginFormData);
      setLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Une erreur est survenue.');
      }
      setLoading(false);
    }
  }

  return { formSchema, onSubmit, loading, error }

}