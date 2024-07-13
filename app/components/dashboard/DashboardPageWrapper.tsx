import React, { ReactNode } from 'react'
import Header from '../Header'
import DashboardAsideHeader from './DashboardAsideHeader'

interface DashboardPageWrapperProps {
  children: ReactNode
}

const DashboardPageWrapper = ({ children }: DashboardPageWrapperProps) => {
  return (
    <>
      <Header />
      <DashboardAsideHeader />
      <div className='mt-6'>
        {children}
      </div>
    </>
  )
}

export default DashboardPageWrapper