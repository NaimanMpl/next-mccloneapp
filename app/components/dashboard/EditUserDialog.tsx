import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EditUserDialogProps {
  id: string,
  name: string,
  email: string
}

const FormSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  admin: z.boolean()
});

const EditUserDialog = ({ id, name, email } : EditUserDialogProps) => {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Éditer l'utilisateur</DialogTitle>
        <DialogDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, nesciunt!</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <h3>Informations</h3>
        <div className='space-y-4'>
          <FormItem>
            <Label>Identifiant</Label>
            <Input defaultValue={name} value={id} disabled />
          </FormItem>
          <FormField 
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <Label>Nom</Label>
                <Input defaultValue={name} placeholder='Imperator' />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <Input defaultValue={email} placeholder='imperator@domain.com' />
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
                  <Switch />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Form>
      <DialogFooter>
        <Button type='submit'>Sauvegarder</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default EditUserDialog