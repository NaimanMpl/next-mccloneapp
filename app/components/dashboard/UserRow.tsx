import { RoleEnum } from '@/app/models/role.model'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import DeleteAccontDialog from '../account/DeleteAccontDialog'
import DeleteUserDialog from './DeleteUserDialog'
import EditUserDialog from './EditUserDialog'
import RoleBadge from './RoleBadge'

interface UserRowProps {
  id: string,
  name: string,
  email: string,
  role: RoleEnum,
  admin: boolean,
  createdAt: Date
}

const UserRow = ({ id, name, email, role, admin, createdAt }: UserRowProps) => {

  const [ isEditDialogOpen, setIsEditDialogOpen ] = useState(false);
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);

  return (
    <TableRow className='cursor-pointer'>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <RoleBadge role={role} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Badge variant={role !== 'Administrateur' ? 'destructive' : 'secondary'}>
                {role === 'Joueur' ? 'Administrateur' : 'Joueur'}
              </Badge>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              Éditer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className='text-destructive'>
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog 
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <EditUserDialog id={id} userRole={role} name={name} email={email} admin={admin} />
        </Dialog>
        <Dialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <DeleteUserDialog userId={id} username={name} />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}

export default UserRow