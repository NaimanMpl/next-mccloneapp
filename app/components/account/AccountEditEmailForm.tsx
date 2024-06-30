import { useEditEmailForm } from '@/app/hooks/useEditEmailForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface AccountEditEmailFormProps {
  email: string
}

const AccountEditEmailForm = ({ email }: AccountEditEmailFormProps) => {

  const { form, onSubmit, loading } = useEditEmailForm({
    defaultValue: email
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Adresse mail</CardTitle>
        <CardDescription>Veuillez saisir une adresse email avec laquelle vous souhaitez pouvoir vous connecter.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField 
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='mt-3 w-80' type='text' defaultValue={email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='border-t border-border px-6 py-2'>
            <div className='flex justify-between items-center w-full'>
              <CardDescription>Les adresses emails doivent êtres vérifiés afin de pouvoir se connecter avec.</CardDescription>
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

export default AccountEditEmailForm