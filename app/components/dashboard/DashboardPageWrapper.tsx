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
      {children}
    </>
  )
}

export default DashboardPageWrapper