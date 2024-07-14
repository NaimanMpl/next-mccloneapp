'use client';
import { useEditPasswordForm } from '@/app/hooks/useEditPasswordForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import AccountPageSkeleton from './AccountPageSkeleton';

const AccountEditPasswordForm = () => {

  const { data: session } = useSession();
  const { form, onSubmit, loading } = useEditPasswordForm();

  return (
    <>
      {!session && <AccountPageSkeleton />}
      {
        session && 
        <Card>
          <CardHeader>
            <CardTitle>Mot de passe</CardTitle>
            <CardDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, natus!</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className='flex flex-col gap-4'>
                <FormField 
                  control={form.control}
                  name='oldPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ancien mot de passe</FormLabel>
                      <FormControl>
                        <Input className='mt-3 w-80' type='password' placeholder='•••••••••••••' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nouveau mot de passe</FormLabel>
                      <FormControl>
                        <Input className='mt-3 w-80' type='password' placeholder='•••••••••••••' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name='confirmNewPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmation du mot de passe</FormLabel>
                      <FormControl>
                        <Input className='mt-3 w-80' type='password' placeholder='•••••••••••••' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className='border-t border-border px-6 py-2'>
                <div className='flex justify-between items-center w-full'>
                  <CardDescription>Le mot de passe doit au moins contenir 8 caractères.</CardDescription>
                  <Button type='submit' disabled={loading}>
                    {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                    Sauvegarder
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      }
    </>
  )
}

export default AccountEditPasswordForm