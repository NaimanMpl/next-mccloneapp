import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import React from 'react';
import AccountLink from './AccountLink';

const AccountHeader = () => {

  return (
    <header className='w-1/5 py-10 flex flex-col gap-8'>
      <nav>
        <ul className='flex flex-col gap-4'>
          <li><AccountLink text='Tableau de bord' href='/account' icon={<DashboardIcon />} /></li>
          <li><AccountLink text='Skin' href='/account/skin' icon={<ViewInArIcon />} /></li>
          <li><AccountLink text='Mot de passe' href='/account/password' icon={<KeyRoundedIcon />} /></li>
        </ul>
      </nav>
    </header>
  )
}

export default AccountHeader