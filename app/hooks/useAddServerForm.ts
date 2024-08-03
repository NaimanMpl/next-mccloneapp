import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateServerMutation } from '../api/slice';

export const useAddServerForm = () => {
  const [createServer, { data, isLoading, error }] = useCreateServerMutation();
  const [primary, setPrimary] = useState(false);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Uh-oh',
        description: 'Le serveur a rencontré un problème.',
        variant: 'destructive',
      });
      return;
    }
    if (data) {
      toast({
        title: 'Succès',
        description: 'Le serveur fait désormais partie du club (très privé)',
      });
      return;
    }
  }, [data, error]);

  const schema = z.object({
    ip: z.string({ message: 'Requis' }),
    port: z.coerce.number({ message: 'Le port doit être un nombre' }),
    primary: z.boolean(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      port: 50000,
      primary: false,
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    void createServer({ ...values });
  };

  return {
    schema,
    form,
    isLoading,
    error,
    data,
    onSubmit,
    primary,
    setPrimary,
  };
};
