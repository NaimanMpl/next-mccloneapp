import { useAddServerForm } from '@/app/hooks/useAddServerForm'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { title } from 'process'
import React, { useEffect } from 'react'

const AddServerDialog = () => {

  const { form, onSubmit, isLoading: loading, primary, setPrimary } = useAddServerForm();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter un serveur</DialogTitle>
        <DialogDescription>Lorem ipsum dolor sit amet.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='ip'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IP du serveur</FormLabel>
                  <FormControl>
                    <Input placeholder='127.0.0.1' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='port'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Port</FormLabel>
                  <FormControl>
                    <Input placeholder='50000' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='primary'
              render={({ field }) => (
                <FormItem className='flex items-center justify-between rounded-lg border border-border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel>Serveur principal</FormLabel>
                    <FormDescription>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, totam!
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={primary} onCheckedChange={(checked) => { setPrimary(checked); form.setValue('primary', checked) }} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button className='mt-4' disabled={loading}>
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Sauvegarder
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}

export default AddServerDialog