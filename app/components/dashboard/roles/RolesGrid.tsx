import { useRoles } from '@/app/contexts/RolesContext';
import { RoleEnum } from '@/app/models/role.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Frown, ListFilter, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import AddRoleDialog from './AddRoleDialog';
import RoleDetails from './RoleDetails';
import RoleDetailsSkeleton from './RoleDetailsSkeleton';

const RolesGrid = () => {

  const { roles, loading } = useRoles();

  return (
    <div className='mt-8'>
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, eius.</CardDescription>
        </CardHeader>
        <CardContent>
        <div className='flex justify-end gap-2 pb-4'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='mr-auto flex gap-2'>
                <Plus className='w-5 h-5' />
                Ajouter un role
              </Button>
            </DialogTrigger>
            <AddRoleDialog />
          </Dialog>
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
          <div className='grid grid-cols-2 gap-3'>
            {loading &&
            Array.from({ length: 4 }).map((item, index) => (
              <RoleDetailsSkeleton key={index} />
            ))
            }
            {
            !loading &&
            roles.length > 0 &&
            roles.map(role => (
              <Link href={`/dashboard/roles/${role.name.toLowerCase()}`}>
                <RoleDetails key={role.name} roleName={role.name as RoleEnum} />
              </Link>
            ))
            }
          </div>
        </CardContent>
        {!loading && roles.length === 0 && 
        <CardFooter className='border-t border-border flex justify-center items-center py-4'>
          <CardDescription>
            <div className='flex items-center gap-2'>
              <p>Aucun role enregistré...</p>
              <Frown />
            </div>
          </CardDescription>
        </CardFooter>
        }
      </Card>
    </div>
  )
}

export default RolesGrid