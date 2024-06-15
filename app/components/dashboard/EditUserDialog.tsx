import { useEditUserForm } from '@/app/hooks/useEditUserForm'
import { RoleEnum } from '@/app/models/role.model'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenuContent, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import RoleBadge from './RoleBadge'

interface EditUserDialogProps {
  id: string,
  name: string,
  userRole: RoleEnum,
  email: string,
  admin: boolean
}

const EditUserDialog = ({ id, userRole, name, email, admin } : EditUserDialogProps) => {
  
  const { form, isAdmin, setIsAdmin, loading, onSubmit } = useEditUserForm({
    userId: id,
    defaultValues: {
      email: email,
      name: name,
      userRole: userRole,
      admin: admin
    }
  });
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Éditer l'utilisateur</DialogTitle>
        <DialogDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, nesciunt!</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormItem>
              <Label>Identifiant</Label>
              <Input value={id} disabled />
            </FormItem>
            <FormField 
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <Label>Nom</Label>
                  <Input defaultValue={name} placeholder='Imperator' {...field} />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <Input defaultValue={email} placeholder='imperator@domain.com' {...field} />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='userRole'
              render={({ field }) => (
                <FormItem>
                  <DropdownMenu>
                    <div className='flex flex-col gap-4'>
                      <Label className='inline-block'>Role</Label>
                      <DropdownMenuTrigger asChild>
                        <button className='cursor-pointer w-fit'>
                          <RoleBadge role={userRole} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel className='text-muted-foreground'>Sélectionner un role</DropdownMenuLabel>
                        <div className='flex flex-col gap-2'>
                          {Object.keys(RoleEnum).map((role) => {
                            if (role === userRole) {
                              return;
                            }
                            return (
                              <RoleBadge key={role} role={role as RoleEnum} />
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

export default EditUserDialog