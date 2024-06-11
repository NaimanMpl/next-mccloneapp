import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { DialogTitle } from '@mui/material'
import { ChevronDown, Circle, Edit, MoreHorizontal, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import EditUserDialog from './EditUserDialog'

interface UserRowProps {
  id: string,
  name: string,
  email: string,
  role: string,
  admin: boolean,
  createdAt: Date
}

const roleCircleColors = {
  'Joueur' : 'bg-neutral-50',
  'Administrateur' : 'bg-red-500'
}

const UserRow = ({ id, name, email, role, admin, createdAt }: UserRowProps) => {

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
            <Badge 
              className='gap-2 flex items-center w-fit'
              variant={role.toLowerCase()}
            >
              <div className={`w-2 h-2 ${roleCircleColors[role]} rounded-full`}></div>
              {role}
            </Badge>
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
        <Checkbox defaultChecked={admin} />
      </TableCell>
      <TableCell>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </TableCell>
      <Dialog>
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
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    Éditer
                  </DropdownMenuItem>
                </DialogTrigger>
              <DropdownMenuItem className='flex gap-2'>
                <span className='text-destructive'>Supprimer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditUserDialog id={id} name={name} email={email} />
        </TableCell>
      </Dialog>
    </TableRow>
  )
}

export default UserRow