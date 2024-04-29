import React, { useState } from "react";

interface RegisterFormData {
  username: string,
  email: string,
  password: string
}

export const useRegisterForm = () => {
  const [ formData, setFormData ] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Envoi du formulaire');
  }

  return { formData, setFormData, handleSubmit }
}