'use client';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { LayoutDashboard, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AccountInfoProps {
  name: string,
  admin: boolean
}

const AccountInfo = ({ name, admin }: AccountInfoProps) => {

  const handleLogout = async () => {
    await fetch('/logout', { method: 'GET' });
    window.location.href = '/';
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='bg-transparent hover:bg-transparent'>
            <div className='flex gap-2 items-center'>
              <Image className='rounded-full' width='30' height='30' src='/default-pp.png' alt='Profile Icon' />
              <Link className='font-semibold' href='/account'>{name}</Link>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='min-w-52 py-2'>
            <li>
                <Link href='/account'>
                  <div className="flex items-center gap-2 px-6 py-2">
                    <Settings className='w-5 h-5' />
                    <span className='text-muted-foreground text-sm'>Paramètres</span>
                  </div>
                </Link>
              </li>
              {
              admin &&
              <li>
                <Link href='/dashboard/users'>
                  <div className="flex items-center gap-2 px-6 py-2">
                    <LayoutDashboard className='w-5 h-5' />
                    <span className='text-muted-foreground text-sm'>Tableau de bord</span>
                  </div>
                </Link>
              </li>
              }
              <li>
                <div className='cursor-pointer' onClick={handleLogout}>
                  <div className="flex items-center gap-2 px-6 py-2">
                    <LogOut className='w-5 h-5 text-destructive' />
                    <span className='text-destructive text-sm'>Déconnexion</span>
                  </div>
                </div>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default AccountInfo