import { Skeleton } from '@/components/ui/skeleton'
import { TableCell } from '@/components/ui/table'
import { TableRow } from '@mui/material'

const ServerRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className='mt-2'>
        <Skeleton className='w-20 h-4' />
      </TableCell>
      <TableCell>
        <Skeleton className='w-36 h-4' />
      </TableCell>
      <TableCell>
        <Skeleton className='w-16 h-4' />
      </TableCell>
      <TableCell>
        <Skeleton className='w-12 h-4' />
      </TableCell>
      <TableCell>
        <Skeleton className='w-32 h-4' />
      </TableCell>
      <TableCell>
        <Skeleton className='w-32 h-4' />
      </TableCell>
      <TableCell>
        <Skeleton className='w-10 h-4' />
      </TableCell>
      <TableCell>
        <Skeleton className='w-10 h-4' />
      </TableCell>
    </TableRow>
  )
}

export default ServerRowSkeleton