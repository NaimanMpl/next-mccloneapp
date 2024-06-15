import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUsers } from '../contexts/UsersContext';
import { updateUser } from '../services/userservice';

interface EditUserFormProps {
  userId: string,
  defaultValues: {
    email: string,
    name: string,
    userRole: string,
    admin: boolean
  }
}

export const useEditUserForm = ({ userId, defaultValues }: EditUserFormProps) => {
  
  const [ isAdmin, setIsAdmin ] = useState(defaultValues.admin);
  const { setUsers } = useUsers();

  const FormSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    userRole: z.string().optional(),
    admin: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues
  });

  
  const [ loading, setLoading ] = useState(false);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { admin, email, name, userRole } = values;
  
    setLoading(true);
    try {
      const updatedUser = await updateUser(userId, email, name, userRole, admin);

      setUsers(users => users.map((user) => { return user.id === userId ? updatedUser : user }));
      toast({ title: 'Succès', description: `L'utilisateur ${updatedUser.name} a été mis à jour`, variant: 'success' });
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh', description: message, variant: 'destructive' });
    }
    setLoading(false);
  }

  return { form, isAdmin, setIsAdmin, FormSchema, loading, onSubmit };
}