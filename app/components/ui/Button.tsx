import React from 'react';

interface ButtonProps {
  label: string,
  backgroundColor: string,
  color: string,
  loading: boolean
}

const Button = ({ backgroundColor, color, loading, label }: ButtonProps) => {
  return (
    <button
      type='submit'
      className={`mt-4 w-full bg-${backgroundColor} rounded-lg py-2 font-bold text-${color}`}
      disabled={loading}
    >
      {label}
    </button>
  )
}

export default Button;