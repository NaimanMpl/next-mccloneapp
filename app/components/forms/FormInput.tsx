'use client';
import React from 'react';
import { useRegisterForm } from '../../hooks/useRegisterForm';

interface FormInputProps {
  type: 'email' | 'password' | 'text',
  label: string,
  name: string,
  id: string,
  placeholder: string
}

const FormInput = ({ placeholder, type, name, id, label } : FormInputProps) => {
  
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-neutral-50' htmlFor={name}>{label}</label>
      <input className='border-solid border-b border-gray bg-transparent outline-none text-gray placeholder-gray font-medium' type={type} name={name} id={id} placeholder={placeholder} />
    </div>
  )
}

export default FormInput