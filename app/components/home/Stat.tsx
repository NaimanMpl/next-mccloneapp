import React from 'react'

interface StatProps {
  title: string,
  description: string
}

const Stat = ({ title, description }: StatProps) => {
  return (
    <div>
      <span className='text-6xl font-semibold'>{title}</span>
      <p>{description}</p>
    </div>
  )
}

export default Stat