import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { MoreHorizontal, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface UserRowProps {
  id: string,
  name: string,
  email: string,
  role: string,
  admin: boolean,
  createdAt: Date
}

const UserRow = ({ id, name, email, role, admin, createdAt }: UserRowProps) => {

  const badgeVariants = {
    'Administrateur' : 'destructive',
    'Joueur' : 'secondary'
  }

  return (
    <TableRow>
      <TableCell>
        <div className='flex gap-4'>
          <Image className='rounded w-10' src='/default-pp.png' alt='Minecraft Clone' width='150' height='100' />
          <div>
            <p className='font-semibold'>{name}</p>
            <p className='text-muted-foreground'>{email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p>{id}</p>
      </TableCell>
      <TableCell>
        <Badge variant={role === 'Administrateur' ? 'destructive' : 'secondary'}>
          {role}
        </Badge>
      </TableCell>
      <TableCell>
        <p>{admin ? 'Administrateur' : 'Utilisateur'}</p>
      </TableCell>
      <TableCell>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className='flex gap-2'>
              <TrashIcon color='hsl(0 62.8% 30.6%)' size='20px' />
              <span className='text-destructive'>Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export default UserRow