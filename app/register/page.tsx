'use client';
import React from 'react';
import FormComponent from '../components/forms/FormComponent';
import FormInput from '../components/forms/FormInput';
import { default as Button, default as FormButton } from '../components/ui/Button';
import { useRegisterForm } from '../hooks/useRegisterForm';

const RegisterPage = () => {

  const { formData, setFormData, handleSubmit, handleChange, loading, error, inputErrors } = useRegisterForm();

  return (
    <div className='h-screen bg-black flex items-center justify-center'>
      <FormComponent onChange={handleChange} onSubmit={handleSubmit} errorMsg={error} title="Inscription">
        <FormInput type='text' errorDialog={inputErrors.username} label="Nom d'utilisateur" id='username' name='username' placeholder='John' />
        <FormInput type='text' errorDialog={inputErrors.email} label='Adresse mail' id='email' name='email' placeholder='johndoe@domain.com' />
        <FormInput type='password' errorDialog={inputErrors.password} label='Mot de passe' id='password' name='password' placeholder='•••••••••••••' />
        <FormInput type='password' errorDialog={inputErrors.confirmPassword} label='Confirmation de mot de passe' id='confirmPassword' name='confirmPassword' placeholder='•••••••••••••' />
        <Button backgroundColor='gold-0' color='black' label="S'inscrire" loading={loading} />
      </FormComponent>
    </div>
  );
}

export default RegisterPage