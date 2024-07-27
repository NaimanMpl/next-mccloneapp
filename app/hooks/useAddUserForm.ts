import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUsers } from '../contexts/UsersContext';
import { AddUserFormData } from '../models/formsdata.model';
import { RoleEnum } from '../models/role.model';
import { addUser } from '../services/userservice';

export const useAddUserForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentRole, setCurrentRole] = useState<RoleEnum>(RoleEnum.Joueur);
  const { setUsers } = useUsers();

  const FormSchema = z
    .object({
      username: z
        .string()
        .min(2, {
          message: "Le nom d'utilisateur doit avoir au moins 2 caractères",
        })
        .max(20, {
          message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères",
        }),
      email: z
        .string()
        .email({ message: 'Veuillez renseigner une adresse mail valide' }),
      password: z.string().min(2, {
        message: 'Le mot de passe doit au moins contenir 2 caractères',
      }),
      confirmPassword: z.string(),
      role: z.enum([RoleEnum.Administrateur, RoleEnum.Joueur]),
      admin: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Les mots de passes doivent correspondre.',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: RoleEnum.Joueur,
      admin: false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const newUser = await addUser({
        ...values,
        role: currentRole,
      } as AddUserFormData);

      setUsers((users) => [...users, newUser]);
      toast({
        title: 'Succès',
        description: `L'utilistateur ${newUser.name} fait désormais partie du club !`,
        variant: 'default',
      });
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh', description: message, variant: 'destructive' });
    }
    setLoading(false);
  };

  return {
    form,
    currentRole,
    setCurrentRole,
    isAdmin,
    setIsAdmin,
    FormSchema,
    loading,
    onSubmit,
  };
};
