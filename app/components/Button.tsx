import React from 'react';

interface ButtonProps {
  label: string,
  loading: boolean
}

const Button = ({ loading, label }: ButtonProps) => {
  return (
    <button disabled={loading} type='submit' className='mt-10 w-full bg-gold-0 rounded-lg py-2 font-bold'>{label}</button>
  )
}

export default Button;