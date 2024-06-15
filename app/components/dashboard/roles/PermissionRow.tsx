import { User } from '@/app/models/user.model'
import { TableCell, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import React from 'react'

interface PermissionRowProps {
  id: number,
  name: string,
  author: User
  createdAt: Date,
}

const PermissionRow = ({ id, name, author, createdAt }: PermissionRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <p>{id}</p>
      </TableCell>
      <TableCell>
        <p>{name}</p>
      </TableCell>
      <TableCell>
        <div className='flex gap-4'>
          <Image className='rounded w-10' src='/default-pp.png' alt='Minecraft Clone' width='150' height='100' />
          <div>
            <p className='font-semibold'>{author.name}</p>
            <p className='text-muted-foreground'>{author.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </TableCell>
    </TableRow>
  )
}

export default PermissionRow