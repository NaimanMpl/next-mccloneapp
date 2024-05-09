import React from 'react';

interface ButtonProps {
  label: string,
  backgroundColor: string,
  color: string,
  fullWidth?: boolean,
  loading?: boolean,
  submit?: boolean
}

const Button = ({ backgroundColor, color, loading = false, label, fullWidth = true, submit = true }: ButtonProps) => {
  const textColor = `text-${color}`;
  return (
    <button
      type={submit ? 'submit' : undefined}
      className={`mt-4 ${fullWidth ? 'w-full' : 'px-10'} ${backgroundColor} rounded-md py-2 font-semibold ${textColor}`}
      disabled={loading}
    >
      {label}
    </button>
  )
}

export default Button;