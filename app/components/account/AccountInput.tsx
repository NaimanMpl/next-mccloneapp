import React from 'react'

interface AccountInputProps {
  type: 'text' | 'password',
  defaultValue: string,
}

const AccountInput = ({ type, defaultValue }: AccountInputProps) => {
  return (
    <input className='mt-3 bg-neutral-950 w-80 pl-4 pr-8 py-2 text-sm rounded-md border border-solid border-neutral-700' type={type} defaultValue={defaultValue} />
  )
}

export default AccountInput