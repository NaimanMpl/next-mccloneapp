'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

interface DashboardLinkProps {
    href: string,
    text: string,
    icon: ReactNode,
}

const DashboardLink = ({ href, text, icon }: DashboardLinkProps) => {

  const pathname = usePathname();
  const active = href == pathname;
  const bgColor = active ? 'bg-gold-0' : 'bg-transparent';
  const textColor = active ? 'text-black' : 'text-neutral-50';

  return (
    <Link className={`flex items-center gap-2 ${bgColor} pl-2 pr-10 py-2 rounded-md ${textColor} font-medium`} href={href}>
      {icon}
      {text}
    </Link>
  )
}

export default DashboardLink