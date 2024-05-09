import React from 'react';

interface ButtonProps {
  label: string,
  backgroundColor: string,
  color: string,
  fullWidth?: boolean,
  loading: boolean
}

const Button = ({ backgroundColor, color, loading, label, fullWidth = true }: ButtonProps) => {
  return (
    <button
      type='submit'
      className={`mt-4 ${fullWidth ? 'w-full' : 'px-10'} bg-${backgroundColor} rounded-lg py-2 font-bold text-${color}`}
      disabled={loading}
    >
      {label}
    </button>
  )
}

export default Button;