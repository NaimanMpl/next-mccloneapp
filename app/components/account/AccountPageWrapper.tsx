import React, { ReactNode } from 'react'
import Header from '../Header'
import AccountHeader from './AccountHeader'

interface AccountPageWrapper {
  children: ReactNode
}

const AccountPageWrapper = ({ children }: AccountPageWrapper) => {
  return (
    <div>
      <Header />
      <div className='border-l-transparent border-r-transparent border border-solid border-neutral-700 px-80 py-10'>
        <h1 className='text-3xl font-semibold'>Paramètres du compte</h1>
      </div>
      <div className='flex px-80'>
        <AccountHeader />
        <div className='px-20 py-10 w-full flex flex-col gap-8'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AccountPageWrapper