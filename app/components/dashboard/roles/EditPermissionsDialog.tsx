import { useEditPermissions } from '@/app/hooks/useEditPermissions'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const EditPermissionsDialog = () => {

  const { form, onSubmit } = useEditPermissions();

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
            name='permission'
            render={({ field }) => (
              <FormItem>
                <Label>Nom de la permission</Label>
                <Input placeholder='core.teleportation' />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <Button>Sauvegarder</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default EditPermissionsDialog