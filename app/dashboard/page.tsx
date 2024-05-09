import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardUserCard from '../components/dashboard/DashboardUserCard';
import DashboardUserInfos from '../components/dashboard/DashboardUserInfos';
import Curve from '../components/layout/Curve';
import Button from '../components/ui/Button';

const Dahsboard = () => {
  return (
    <div className='h-screen flex bg-black text-neutral-50'>
      <DashboardHeader />
      <div className='px-12 py-10'>
        <h1 className='text-3xl font-bold'>Vue du compte</h1>
        <DashboardUserCard />
        <h1 className='text-2xl font-bold mt-10'>Informations du compte</h1>
        <div className='flex items-start'>
          <DashboardUserInfos />
          <div className='ml-20 mt-5'>
            <Button backgroundColor='bg-gold-0' color='black' label='Éditer' loading={false} fullWidth={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dahsboard