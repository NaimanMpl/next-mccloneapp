import { User } from '@/app/models/user.model'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import DeletePermissionDialog from '../dialogs/DeletePermissionDialog'
import EditPermissionDialog from '../dialogs/EditPermissionDialog'

interface PermissionRowProps {
  id: number,
  name: string,
  author: User
  createdAt: Date,
}

const PermissionRow = ({ id, name, author, createdAt }: PermissionRowProps) => {

  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);
  const [ isEditDialogOpen, setIsEditDialogOpen ] = useState(false);

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
          <EditPermissionDialog />
        </Dialog>
        <Dialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <DeletePermissionDialog />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}

export default PermissionRow