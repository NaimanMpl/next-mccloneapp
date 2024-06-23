import { useEditUsernameForm } from '@/app/hooks/useEditUsernameForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface AccountEditUsernameFormProps {
  username: string
}

const AccountEditUsernameForm = ({ username }: AccountEditUsernameFormProps) => {

  const { form, onSubmit, loading } = useEditUsernameForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Nom d'utilisateur</CardTitle>
        <CardDescription>Le nom d'utilisateur est utilisé pour vous différencier des autres joueurs.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='mt-3 w-80' type='text' placeholder='Imperator' defaultValue={username} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='border-t border-border px-6 py-2'>
            <div className='flex justify-between items-center w-full'>
              <CardDescription>Veuillez ne pas dépasser 20 caractères.</CardDescription>
              <Button type='submit' disabled={loading}>
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Sauvegarder
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default AccountEditUsernameForm