import { ServerInfo } from '@prisma/client';
import React, { useEffect, useState } from 'react';

interface ServerInfoCardProps {
  title: string,
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE',
  label: string
}

const ServerInfoCard = ({ title, status, label }: ServerInfoCardProps) => {

  let bgColor = 'bg-red-500';
  let borderColor = 'border-red-700';
  switch (status) {
    case 'ONLINE':
      bgColor = 'bg-green-500';
      borderColor = 'border-green-700';
      break;
    case 'MAINTENANCE':
      bgColor = 'bg-orange-500';
      borderColor = 'border-orange-700';
      break;
  }

  return (
    <div className='px-10 py-1 rounded-3xl border border-solid border-gray'>
      <span className='text-sm text-gray font-medium'>{title}</span>
      <div className='flex items-center gap-2'>
        <div className={`w-2 h-2 ${bgColor} rounded-full border-2 border-solid ${borderColor}`}></div>
        <p className='text-sm text-neutral-50 font-bold'>{label}</p>
      </div>
    </div>
  )
}

export default ServerInfoCard