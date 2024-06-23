import { useAddUserForm } from '@/app/hooks/useAddUserForm'
import { RoleEnum } from '@/app/models/role.model'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenuContent, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Loader2 } from 'lucide-react'
import RoleBadge from '../RoleBadge'

const AddUserDialog = () => {
  
  const { form, isAdmin, setIsAdmin, currentRole, setCurrentRole, loading, onSubmit } = useAddUserForm();
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter un utilisateur</DialogTitle>
        <DialogDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, nesciunt!</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <Label>Nom</Label>
                  <FormControl>
                    <Input placeholder='Imperator' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input placeholder='imperator@domain.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <Label>Mot de passe</Label>
                  <FormControl>
                    <Input type='password' placeholder='•••••••••••••' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <Label>Confirmer le mot de passe</Label>
                  <FormControl>
                    <Input type='password' placeholder='•••••••••••••' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <DropdownMenu>
                    <div className='flex flex-col gap-4'>
                      <Label className='inline-block'>Role</Label>
                      <DropdownMenuTrigger asChild>
                        <button className='cursor-pointer w-fit'>
                          <RoleBadge role={currentRole} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel className='text-muted-foreground'>Sélectionner un role</DropdownMenuLabel>
                        <div className='flex flex-col gap-2'>
                          {Object.keys(RoleEnum).map((role) => {
                            if (role === currentRole) {
                              return;
                            }
                            return (
                              <DropdownMenuItem key={role} onClick={() => setCurrentRole(role as RoleEnum)}>
                                <RoleBadge role={role as RoleEnum} />
                              </DropdownMenuItem>
                            )
                          })}
                        </div>
                      </DropdownMenuContent>
                    </div>
                  </DropdownMenu>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='admin'
              render={({ field }) => (
                <FormItem className='flex items-center justify-between rounded-lg border border-border p-4'>
                  <div className="space-y-0.5">
                    <FormLabel>
                      Administrateur
                    </FormLabel>
                    <FormDescription>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, non?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={isAdmin} onCheckedChange={(checked) => { setIsAdmin(checked); form.setValue('admin', checked) }} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button className='mt-4' disabled={loading} type='submit'>
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Sauvegarder
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default AddUserDialog