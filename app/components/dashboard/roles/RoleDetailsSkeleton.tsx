import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const RoleDetailsSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className='w-40 h-6' />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='py-2 flex flex-col gap-2'>
          <Skeleton className='w-24 h-4' />
          <Skeleton className='w-16 h-4' />
        </div>
        <div className='py-2 flex flex-col gap-2'>
          <Skeleton className='w-10 h-4' />
          <Skeleton className='w-16 h-4' />
        </div>
      </CardContent>
    </Card>
  )
}

export default RoleDetailsSkeleton