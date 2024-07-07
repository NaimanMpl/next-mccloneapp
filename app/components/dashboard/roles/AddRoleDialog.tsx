import { useAddRoleForm } from '@/app/hooks/useAddRoleForm';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AddRoleDialog = () => {

  const { FormSchema, form, onSubmit } = useAddRoleForm();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter un role</DialogTitle>
        <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, blanditiis!</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <Label>Nom du role</Label>
                <Input placeholder="Modérateur" {...field} />
              </FormItem>
            )}
          />
          <DialogFooter className='mt-4'>
            <Button type='submit'>Sauvegarder</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default AddRoleDialog