import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import DashboardLink from './DashboardLink';

const DashboardHeader = () => {

  return (
    <header className='px-8 py-10 flex flex-col gap-8 items-center border-r border-solid border-neutral-800'>
      <Link href='/'>
        <Image src='/logo.png' alt='Minecraft Clone' width='150' height='100' />
      </Link>
      <nav>
        <ul className='flex flex-col gap-4'>
          <li><DashboardLink text='Tableau de bord' href='/dashboard' icon={<DashboardIcon />} /></li>
          <li><DashboardLink text='Mot de passe' href='/dashboard/password' icon={<KeyRoundedIcon />} /></li>
        </ul>
      </nav>
    </header>
  )
}

export default DashboardHeader