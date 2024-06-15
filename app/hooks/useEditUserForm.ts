import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { z } from 'zod';
import { updateUser } from '../services/userservice';

export const useEditUserForm = ({ userId }: { userId: string }) => {
  const FormSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    userRole: z.string().optional(),
    admin: z.boolean().optional(),
  });
  const [ loading, setLoading ] = useState(false);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { admin, email, name, userRole } = values;
  
    setLoading(true);
    try {
      console.log(values)
      await updateUser(userId, email, name, userRole, admin);
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh', description: message, variant: 'destructive' });
    }
    setLoading(false);
  }

  return { FormSchema, loading, onSubmit };
}