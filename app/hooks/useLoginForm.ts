import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { loginUser } from "../services/authservice";

export interface LoginFormData {
  email: string,
  password: string
}

export const useLoginForm = () => {
  
  const [ formData, setFormData ] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const router = useRouter();
  const [ error, setError ] = useState('');
  const [ inputError, setInputError ] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [ loading, setLoading ] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  }

  const validateForm = () => {

    const { email, password } = formData;
    let valid = true;
    const errors: LoginFormData = {
      email: '',
      password: '',
    };

    if (email.length === 0) {
      errors.email = 'Veuillez renseigner une adresse mail';
      valid = false;
    }

    if (password.length === 0) {
      errors.password = 'Veuillez renseigner un mot de passe';
      valid = false;
    }

    setInputError(errors);

    return valid;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validForm = validateForm();

    if (!validForm) {
      return;
    }

    try {
      await loginUser(formData);
      router.push('/');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Une erreur est survenue.');
      }
      setLoading(false);
    }
  }

  return { formData, inputError, setFormData, handleChange, handleSubmit, loading, error }

}