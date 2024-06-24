import { ReactNode } from 'react'

interface FeatureCardProps {
  children: ReactNode
}

export const FeatureCard = ({ children }: FeatureCardProps) => {
  return (
    <div className='flex items-center w-full justify-between'>
      {children}
    </div>
  )
}

export const FeatureCardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export const FeatureCardTitle = ({ children }: { children: string }) => {
  return (
    <p className='font-bold text-xl md:text-lg mobile:text-base'>{children}</p>
  )
}

export const FeatureCardDescription = ({ children }: { children: string }) => {
  return (
    <p className='font-medium text-lg text-muted-foreground md:text-base mobile:text-sm'>{children}</p>
  )
}