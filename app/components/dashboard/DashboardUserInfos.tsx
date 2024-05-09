'use client';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import Button from '../ui/Button';

interface DashboardInfoProps {
  label: string,
  text: string
}

const DashboardInfo = ({ label, text }: DashboardInfoProps) => {
  return (
    <div className='flex flex-col'>
      <span className='text-gray'>{label}</span>
      <p className='font-bold text-xl'>{text}</p>
    </div>
  )
}

const DashboardUserInfos = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className='grid grid-cols-2 mt-8 gap-y-10'>
      <DashboardInfo label="Nom d'utilisateur" text={user.name} />
      <DashboardInfo label="Adresse email" text={user.email} />
      <DashboardInfo label="Date de création" text='06 mai 2024' />
    </div>
  )
}

export default DashboardUserInfos