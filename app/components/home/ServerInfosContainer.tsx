import React, { ReactNode } from 'react'

interface ServerInfosContainerProps {
  children: ReactNode
}

const ServerInfosContainer = ({ children }: ServerInfosContainerProps) => {
  return (
    <div className='flex items-center gap-10'>
      {children}
    </div>
  )
}

export default ServerInfosContainer