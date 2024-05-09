import React, { useState } from "react";
import { registerUser } from "../services/authservice";
import logger from "../utils/logger";


export interface RegisterFormData {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}

export const useRegisterForm = () => {
  const [ formData, setFormData ] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [ inputErrors, setInputErrors ] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;
    
    const errors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    let valid = true;

    if (username.length === 0) {
      errors.username = "Veuillez renseigner un nom d'utilisateur.";
      valid = false;
    }

    if (email.length === 0) {
      errors.email = 'Veuillez renseigner une adresse mail.';
      valid = false;
    }

    if (password.length === 0) {
      errors.password = 'Veuillez renseigner un mot de passe.';
      valid = false;
    }

    if (confirmPassword.length === 0) {
      errors.confirmPassword = 'Veuillez confirmer votre mot de passe.';
      valid = false;
    }

    if (confirmPassword !== password) {
      errors.password = 'Les 2 mots de passes doivent être identiques.';
      errors.confirmPassword = 'Les 2 mots de passes doivent être identiques.';
      valid = false;
    }

    setInputErrors(errors);

    return valid;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validForm = validateForm();

    if (!validForm) {
      return;
    }

    try {
      setLoading(true);
      await registerUser(formData);
      setLoading(false);
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

  return { formData, setFormData, handleSubmit, handleChange, loading, error, inputErrors }
}