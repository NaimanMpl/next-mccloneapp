import React from 'react';

interface RegisterButtonProps {
  loading: boolean
}

const RegisterButton = ({ loading }: RegisterButtonProps) => {
  return (
    <button disabled={loading} type='submit' className='mt-10 w-full bg-gold-0 rounded-lg py-2 font-bold'>S'inscrire</button>
  )
}

export default RegisterButton