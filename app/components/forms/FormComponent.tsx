'use client';
import React, { ReactNode } from 'react';

type FormProps = {
  title: string,
  children: ReactNode,
  onChange: (e: React.ChangeEvent<HTMLFormElement>) => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const FormComponent = ({title, children, onChange, onSubmit }: FormProps) => {

  return (
    <form onChange={onChange} onSubmit={onSubmit} className='flex flex-col w-100 h-96 px-6 pt-10 gap-4'>
      <h1 className='text-4xl text-center font-bold text-neutral-50'>{title}</h1>
      {children}
    </form>
  )
}

export default FormComponent