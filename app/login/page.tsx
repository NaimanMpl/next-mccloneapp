'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormWrapper from '../components/forms/FormWrapper';
import { useLoginForm } from '../hooks/useLoginForm';

const LoginForm = () => {

  const { formSchema, onSubmit, loading, error } = useLoginForm();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  
  return (
    <FormWrapper title='Se connecter' description='Entrez votre adresse mail et votre mot de passe pour accéder à votre compte' error={error}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <Label htmlFor='email'>Adresse mail</Label>
                <FormControl>
                  <Input placeholder="john.doe@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <Label htmlFor='password'>Mot de passe</Label>
                <FormControl>
                  <Input type='password' placeholder="•••••••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-2'>
            <Button disabled={loading} className='w-full' type='submit'>
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Connexion
            </Button>
            <div className='mt-4 text-center text-sm'>
              Pas encore de compte ? {" "}
              <Link href='/register' className='underline'>
                S'inscrire
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export default LoginForm;