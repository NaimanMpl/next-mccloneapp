import React from 'react'

interface StatProps {
  title: string,
  description: string
}

const Stat = ({ title, description }: StatProps) => {
  return (
    <div>
      <span className='text-6xl font-semibold mobile:text-4xl'>{title}</span>
      <p className='mobile:text-sm'>{description}</p>
    </div>
  )
}

export default Stat