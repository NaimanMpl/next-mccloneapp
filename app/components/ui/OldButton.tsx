import React from 'react';

interface OldButtonProps {
  label: string,
  backgroundColor: string,
  color: string,
  fullWidth?: boolean,
  loading?: boolean,
  submit?: boolean
}

const OldButton = ({ backgroundColor, color, loading = false, label, fullWidth = true, submit = true }: OldButtonProps) => {
  const textColor = `text-${color}`;
  return (
    <button
      type={submit ? 'submit' : undefined}
      className={`${fullWidth ? 'w-full' : 'px-10'} ${backgroundColor} rounded-md py-2 font-semibold ${textColor}`}
      disabled={loading}
    >
      {label}
    </button>
  )
}

export default OldButton;