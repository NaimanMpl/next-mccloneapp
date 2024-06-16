import { useUsers } from '@/app/contexts/UsersContext'
import { RoleEnum } from '@/app/models/role.model'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListFilter, Pencil, Plus, Search } from 'lucide-react'
import UserRow from '../UserRow'
import UserRowSkeleton from '../UserRowSkeleton'
import { UsersTableHead } from '../UsersTable'
import AddUserDialog from '../dialogs/AddUserDialog'
import EditPermissionsDialog from './EditPermissionsDialog'
import PermissionRow from './PermissionRow'

interface RolesUsersTable {
  roleName: string
}

const RolesUsersTable = ({ roleName }: RolesUsersTable) => {

  const { users, loading } = useUsers();

  return (
    <Tabs defaultValue='users'>
      <TabsList className='mb-3'>
        <TabsTrigger value='users'>Utilisateurs</TabsTrigger>
        <TabsTrigger value='permissions'>Permissions</TabsTrigger>
      </TabsList>
      <Card>
        <CardHeader>
          <CardTitle>{roleName}</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, unde.</CardDescription>
        </CardHeader>
        <CardContent>
          <TabsContent value='users'>
            <div className='flex justify-end gap-2 pb-4'>
              <div className="mr-auto flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='flex gap-2'>
                      <Plus className='w-5 h-5' />
                      Ajouter un utilisateur
                    </Button>
                  </DialogTrigger>
                  <AddUserDialog />
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='flex gap-2' variant='outline'>
                      <Pencil className='w-4 h-4' />
                      Modifier le groupe
                    </Button>
                  </DialogTrigger>
                  <EditPermissionsDialog />
                </Dialog>
              </div>
              <div className='relative lg:w-96'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input className='pl-8' placeholder='Rechercher' />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className='gap-1 text-sm'
                  >
                    <ListFilter className='h-3.5 w-3.5' />
                    <span>Filtrer</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked>
                    Nom
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Table>
              <TableHeader>
                <UsersTableHead />
              </TableHeader>
              <TableBody>
                {loading ? (
                    Array.from({ length: 10 }).map(() => (<UserRowSkeleton />))
                  ) : (
                    <>
                      {users.filter(user => user.role.name === roleName).map(user => {
                        return (
                          <UserRow 
                            key={user.id} 
                            id={user.id} 
                            name={user.name} 
                            email={user.email} 
                            admin={user.admin} 
                            createdAt={user.createdAt}
                            role={user.role.name as RoleEnum} 
                          />
                        )
                      })}
                    </>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value='permissions'>
            <div className='flex justify-end gap-2 pb-4'>
              <div className="mr-auto flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='flex gap-2'>
                      <Plus className='w-5 h-5' />
                      Ajouter une permission
                    </Button>
                  </DialogTrigger>
                  <EditPermissionsDialog />
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='flex gap-2' variant='outline'>
                      <Pencil className='w-4 h-4' />
                      Modifier le groupe
                    </Button>
                  </DialogTrigger>
                  <EditPermissionsDialog />
                </Dialog>
              </div>
              <div className='relative lg:w-96'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input className='pl-8' placeholder='Rechercher' />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className='gap-1 text-sm'
                  >
                    <ListFilter className='h-3.5 w-3.5' />
                    <span>Filtrer</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked>
                    Nom
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom de la permission</TableHead>
                  <TableHead>Crée par</TableHead>
                  <TableHead>Date de création</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <PermissionRow
                  id={1}
                  name='commands.teleportation'
                  author={{ id: '82096844-076f-4ce3-ad67-0bb9d51b2b49', name: 'ZelphiX', email: 'zelphix@gmail.com' }}
                  createdAt={new Date()}
                />
                <PermissionRow
                  id={2}
                  name='commands.schematics'
                  author={{ id: '82096844-076f-4ce3-ad67-0bb9d51b2b49', name: 'DragonQQ', email: 'dragonqq@gmail.com' }}
                  createdAt={new Date()}
                />
                <PermissionRow
                  id={3}
                  name='commands.gamemode'
                  author={{ id: '82096844-076f-4ce3-ad67-0bb9d51b2b49', name: 'Molox', email: 'molox@gmail.com' }}
                  createdAt={new Date()}
                />
              </TableBody>
            </Table>
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  )
}

export default RolesUsersTable