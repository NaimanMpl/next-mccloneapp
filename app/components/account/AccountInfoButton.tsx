'use client';
import React, { MouseEventHandler } from 'react';


interface AccountInfoButtonProps {
  text: string,
  backgroundColor?: string,
  color?: string,
  handleClick: MouseEventHandler<HTMLButtonElement>
}

const AccountInfoButton = ({ text, backgroundColor = 'bg-neutral-50', color='text-black', handleClick }: AccountInfoButtonProps) => {
  return (
    <button className={`${backgroundColor} px-4 py-2 ${color} font-semibold rounded-md text-sm`} onClick={handleClick}>
      {text}
    </button>
  )
}

export default AccountInfoButton