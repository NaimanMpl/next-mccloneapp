'use client';
import FormComponent from '@/app/components/forms/FormComponent';
import { useRegisterForm } from '@/app/hooks/useRegisterForm';
import React from 'react';
import RegisterButton from '../RegisterButton';
import FormInput from './FormInput';

const RegisterForm = () => {

  const { formData, setFormData, handleSubmit } = useRegisterForm();

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  return (
    <FormComponent onChange={handleChange} onSubmit={handleSubmit} title="Inscription">
      <FormInput type='text' label="Nom d'utilisateur" id='username' name='username' placeholder='John' />
      <FormInput type='text' label='Adresse mail' id='email' name='email' placeholder='johndoe@domain.com' />
      <FormInput type='password' label='Mot de passe' id='password' name='password' placeholder='•••••••••••••' />
      <RegisterButton />
    </FormComponent>
  )
}

export default RegisterForm