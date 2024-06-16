import { useAddPermissionForm } from '@/app/hooks/useAddPermissionForm'
import { RoleEnum, RolesDict } from '@/app/models/role.model'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

interface AddPermissionDialogProps {
  roleName: RoleEnum,
  authorId: string
}

const AddPermissionDialog = ({ roleName, authorId }: AddPermissionDialogProps) => {

  const { form, onSubmit, loading } = useAddPermissionForm({
    roleName: roleName,
    authorId: authorId
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter une permission</DialogTitle>
        <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, eos.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField 
            control={form.control}
            name='permissionName'
            render={({ field }) => (
              <FormItem>
                <Label>Nom de la permission</Label>
                <Input placeholder='core.teleportation' {...field} />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button disabled={loading} type='submit' className='mt-4'>
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Sauvegarder
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default AddPermissionDialog