import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { ChevronDown, MoreHorizontal, TrashIcon } from 'lucide-react'
import Image from 'next/image'

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
              className='hover:bg-transparent'
            >
              <Badge 
                className='flex items-center gap-1'
                variant={role === 'Administrateur' ? 'destructive' : 'secondary'}
              >
                {role}
                <ChevronDown className='w-4 h-4'/>
              </Badge>
            </Button>
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
              <TrashIcon className='text-destructive w-5 h-5' />
              <span className='text-destructive'>Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export default UserRow