import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Image } from 'lucide-react'
import React from 'react'

interface SkinFileCardProps {
  name: string,
  size: number
}

const SkinFileCard = ({ name, size }: SkinFileCardProps) => {
  return (
    <Card>
      <CardContent className='relative flex flex-col gap-4 pt-4'>
        <div className='flex items-center gap-2'>
          <Image size='30' />
          <div>
            <CardDescription className='text-foreground'>{name}</CardDescription>
            <CardDescription>{size} ko</CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SkinFileCard