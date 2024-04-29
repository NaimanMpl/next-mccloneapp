'use client';
import React, { ReactNode } from 'react';

type FormProps = {
  title: string,
  children: ReactNode,
  errorMsg: string
  onChange: (e: React.ChangeEvent<HTMLFormElement>) => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const FormComponent = ({title, children, errorMsg, onChange, onSubmit }: FormProps) => {
  return (
    <form onChange={onChange} onSubmit={onSubmit} className='flex flex-col w-100 px-6 pt-10 gap-4'>
      <h1 className='pb-10 text-4xl text-center font-bold text-neutral-50'>{title}</h1>
      {errorMsg !== '' && <span className='text-md text-red-500 text-center py-4'>{errorMsg}</span>}
      {children}
    </form>
  )
}

export default FormComponent