'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRegisterForm } from '../hooks/useRegisterForm';

const RegisterPage = () => {


  const { formSchema, onSubmit, loading, error } = useRegisterForm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  /*
  <FormComponent onChange={handleChange} onSubmit={handleSubmit} errorMsg={error} title="Inscription">
    <FormInput type='text' errorDialog={inputErrors.username} label="Nom d'utilisateur" id='username' name='username' placeholder='John' />
    <FormInput type='text' errorDialog={inputErrors.email} label='Adresse mail' id='email' name='email' placeholder='johndoe@domain.com' />
    <FormInput type='password' errorDialog={inputErrors.password} label='Mot de passe' id='password' name='password' placeholder='•••••••••••••' />
    <FormInput type='password' errorDialog={inputErrors.confirmPassword} label='Confirmation de mot de passe' id='confirmPassword' name='confirmPassword' placeholder='•••••••••••••' />
    <Button backgroundColor='bg-gold-0' color='black' label="S'inscrire" loading={loading} />
  </FormComponent>
  */

  return (
    <div className='h-screen flex items-center justify-center'>
      <Card className='mx-auto max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl'>S'inscrire</CardTitle>
          <CardDescription className='text-red-500'>{error}</CardDescription>
          <CardDescription>
            Entrez vos informations pour créer un compte qui vous identifiera en jeu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Label htmlFor='username'>Nom d'utilisateur</Label>
                    <FormControl>
                      <Input placeholder="john.doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Label htmlFor='confirmPassword'>Confirmation de mot de passe</Label>
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
                  S'inscrire
                </Button>
                <div className='mt-4 text-center text-sm'>
                  Déjà un compte ? {" "}
                  <Link href='/login' className='underline'>
                    Se connecter
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage