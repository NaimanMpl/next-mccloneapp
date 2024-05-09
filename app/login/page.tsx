'use client';
import React from 'react';
import FormComponent from '../components/forms/FormComponent';
import FormInput from '../components/forms/FormInput';
import Button from '../components/ui/Button';
import { useLoginForm } from '../hooks/useLoginForm';

const LoginForm = () => {

  const { formData, setFormData, handleChange, handleSubmit, inputError, loading, error } = useLoginForm();

  return (
    <div className='h-screen bg-black flex items-center justify-center'>
      <FormComponent title='Se connecter' errorMsg={error} onChange={handleChange} onSubmit={handleSubmit}>
        <FormInput type='text' name='email' id='email' label='Adresse mail' placeholder='johndoe@domain.com' errorDialog={inputError.email} />
        <FormInput type='password' name='password' id='password' label='Mot de passe' placeholder='•••••••••••••' errorDialog={inputError.password} />
        <Button backgroundColor='bg-gold-0' color='black' label="Connexion" loading={loading} />
      </FormComponent>
    </div>
  );
}

export default LoginForm;