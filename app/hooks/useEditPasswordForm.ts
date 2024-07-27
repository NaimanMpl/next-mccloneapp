import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EditPasswordFormData } from '../models/formsdata.model';
import { savePassword } from '../services/userservice';

export const useEditPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const FormSchema = z
    .object({
      oldPassword: z.string(),
      newPassword: z
        .string()
        .min(8, {
          message: 'Le mot de passe doit au moins contenir 8 caractères ',
        }),
      confirmNewPassword: z
        .string()
        .min(8, {
          message: 'Le mot de passe doit au moins contenir 8 caractères ',
        }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: 'Les mots de passes doivent correspondre.',
      path: ['confirmNewPassword'],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      await savePassword(values as EditPasswordFormData);
      toast({
        title: 'Succès ✨',
        description: 'Votre mot de passe a été mis à jour.',
      });
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh !', description: message, variant: 'destructive' });
    }
    setLoading(false);
  };

  return { form, onSubmit, loading };
};
