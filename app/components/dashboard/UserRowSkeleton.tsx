import { Skeleton } from '@/components/ui/skeleton'
import { TableCell } from '@/components/ui/table'
import { TableRow } from '@mui/material'
import React from 'react'

const UserRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className='mt-2'>
        <div className='flex gap-4 items-center'>
          <Skeleton className='w-12 h-12 rounded-full' />
          <div className='flex flex-col gap-1'>
            <Skeleton className='w-12 h-4' />
            <Skeleton className='w-20 h-4' />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className='w-36 h-4' />
      </TableCell>
      <TableCell>
        <Skeleton className='w-12 h-4' />
      </TableCell>
      <TableCell>
        <Skeleton className='w-12 h-4' />
      </TableCell>
    </TableRow>
  )
}

export default UserRowSkeleton