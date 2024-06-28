import React, { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'

type GradientTitleProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  children: ReactNode,
}

const GradientTitle: FC<GradientTitleProps> = ({ children, ...props }) => {
  return (
    <h2 
      className='pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-r from-[#000000] from-65% to-neutral-200/60 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10'
      {...props}
    >
      {children}
    </h2>
  )
}

export default GradientTitle