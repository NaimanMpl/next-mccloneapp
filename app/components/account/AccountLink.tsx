'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

interface AccountLinkProps {
    href: string,
    text: string,
    icon: ReactNode,
}

const AccountLink = ({ href, text, icon }: AccountLinkProps) => {

  const pathname = usePathname();
  const active = href == pathname;
  const bgColor = 'bg-transparent';
  const textColor = active ? 'text-foreground' : 'text-muted-foreground';

  return (
    <Link className={`flex items-center gap-2 ${bgColor} pl-2 pr-10 py-2 rounded-md ${textColor} text-sm`} href={href}>
      {icon}
      {text}
    </Link>
  )
}

export default AccountLink