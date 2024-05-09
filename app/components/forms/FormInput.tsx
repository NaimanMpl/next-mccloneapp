'use client';
import React from 'react';

interface FormInputProps {
  type: 'email' | 'password' | 'text',
  label: string,
  name: string,
  errorDialog: string,
  id: string,
  placeholder: string
}

const FormInput = ({ placeholder, type, name, errorDialog, id, label } : FormInputProps) => {
  
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-neutral-50 font-semibold text-sm' htmlFor={name}>{label}</label>
      <input className='py-2 text-md border-solid border-b border-gray bg-transparent outline-none text-neutral-50 placeholder-gray font-medium focus:border-gold-0 focus:transition-all' type={type} name={name} id={id} placeholder={placeholder} />
      {errorDialog.length > 0 && <span className='text-sm text-red-500 font-medium'>{errorDialog}</span>}
    </div>
  );
}

export default FormInput