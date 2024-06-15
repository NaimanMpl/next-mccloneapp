import { useEditPermissions } from '@/app/hooks/useEditPermissions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import React from 'react'

const EditPermissionsDialog = () => {

  const { form, onSubmit } = useEditPermissions();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Modifier le groupe</DialogTitle>
        <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, eos.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField 
            control={form.control}
            name='permission'
            render={({ field }) => (
              <FormItem>
                <Label>Ajouter une permission</Label>
                <Input placeholder='core.teleportation' />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div>
        {Array.from({length: 10}).map(() => (
          <Badge variant='secondary'>
            <div className='flex items-center gap-1'>
              <span>commands.schematic</span>
              <X className='w-4 h-4' />
            </div>
          </Badge>
        ))}
      </div>
      <DialogFooter>
        <Button>Sauvegarder</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default EditPermissionsDialog