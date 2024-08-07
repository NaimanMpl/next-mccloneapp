'use client';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface AccountInfoProps {
  name: string,
  admin: boolean,
  profileIconUrl: string
}

const AccountInfo = ({ name, admin, profileIconUrl }: AccountInfoProps) => {

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='bg-transparent hover:bg-transparent'>
            <div className='flex gap-2 items-center'>
              <img src={profileIconUrl} alt="Profile Icon" className='w-[30px] h-[30px] rounded-full' />
              <Link className='font-semibold' href='/account'>{name}</Link>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='min-w-52 py-2'>
              <li>
                <Link href='/account'>
                  <div className="flex items-center gap-2 px-6 py-2 hover:bg-accent">
                    <Settings className='w-5 h-5' />
                    <span className='text-muted-foreground text-sm'>Paramètres</span>
                  </div>
                </Link>
              </li>
              {
              admin &&
              <li>
                <Link href='/dashboard'>
                  <div className="flex items-center gap-2 px-6 py-2 hover:bg-accent">
                    <LayoutDashboard className='w-5 h-5' />
                    <span className='text-muted-foreground text-sm'>Tableau de bord</span>
                  </div>
                </Link>
              </li>
              }
              <li>
                <div className='cursor-pointer' onClick={handleLogout}>
                  <div className="flex items-center gap-2 px-6 py-2 hover:bg-accent">
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