import { title } from 'process'
import React from 'react'

interface TimeProps {
  number: string | number,
  subtitle: string
}

const Time = ({ number, subtitle }: TimeProps) => {
  return (
    <div className='flex flex-col items-center'>
      <span className='text-7xl font-bold'>{number}</span>
      <span className='uppercase text-sm font-medium'>{subtitle}</span>
    </div>
  )
}

export default Time