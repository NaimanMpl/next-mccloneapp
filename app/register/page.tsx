import React from 'react'
import FormComponent from '../components/forms/FormComponent'
import FormInput from '../components/forms/FormInput'
import RegisterForm from '../components/forms/RegisterForm'
import RegisterButton from '../components/RegisterButton'
import { useRegisterForm } from '../hooks/useRegisterForm'

const RegisterPage = () => {

  return (
    <div className='h-screen bg-black flex items-center justify-center'>
        <RegisterForm />
    </div>
  )
}

export default RegisterPage