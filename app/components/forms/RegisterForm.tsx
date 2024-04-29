'use client';
import FormComponent from '@/app/components/forms/FormComponent';
import { useRegisterForm } from '@/app/hooks/useRegisterForm';
import React from 'react';
import RegisterButton from '../RegisterButton';
import FormInput from './FormInput';

const RegisterForm = () => {

  const { formData, setFormData, handleSubmit, loading, error, inputErrors } = useRegisterForm();

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  return (
    <FormComponent onChange={handleChange} onSubmit={handleSubmit} errorMsg={error} title="Inscription">
      <FormInput type='text' errorDialog={inputErrors.username} label="Nom d'utilisateur" id='username' name='username' placeholder='John' />
      <FormInput type='text' errorDialog={inputErrors.email} label='Adresse mail' id='email' name='email' placeholder='johndoe@domain.com' />
      <FormInput type='password' errorDialog={inputErrors.password} label='Mot de passe' id='password' name='password' placeholder='•••••••••••••' />
      <FormInput type='password' errorDialog={inputErrors.confirmPassword} label='Confirmation de mot de passe' id='confirmPassword' name='confirmPassword' placeholder='•••••••••••••' />
      <RegisterButton loading={loading} />
    </FormComponent>
  )
}

export default RegisterForm