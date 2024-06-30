import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GradientTitleProps {
  children: ReactNode,
  className?: string
}

const GradientTitle = ({ children, className }: GradientTitleProps) => {
  return (
    <h2 
      className={cn(`pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-r from-[#000000] from-65% to-neutral-200/60 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mobile:text-5xl mobile:from-50%`, className)}
    >
      {children}
    </h2>
  )
}

export default GradientTitle