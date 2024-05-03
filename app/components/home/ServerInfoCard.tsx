import React from 'react'

interface ServerInfoCardProps {
  title: string,
  status: 'OK' | 'WARN' | 'DOWN',
  label: string
}

const ServerInfoCard = ({ title, status, label }: ServerInfoCardProps) => {
  return (
    <div className='px-10 py-1 rounded-3xl border border-solid border-gray'>
      <span className='text-sm text-gray font-medium'>{title}</span>
      <div className='flex items-center gap-2'>
        <div className='w-2 h-2 bg-green-500 rounded-full border-2 border-solid border-green-700'></div>
        <p className='text-sm text-neutral-50 font-bold'>{label}</p>
      </div>
    </div>
  )
}

export default ServerInfoCard