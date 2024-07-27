import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { saveUsername } from '../services/userservice';

export const useEditUsernameForm = ({
  defaultValue,
}: {
  defaultValue: string;
}) => {
  const [loading, setLoading] = useState(false);
  const FormSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Le nom d'utilisateur doit avoir au moins 2 caractères",
      })
      .max(20, {
        message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères",
      }),
  });
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: defaultValue,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { username } = values;

    if (!session) {
      return;
    }

    if (username === session.user.name) {
      toast({
        title: 'Pas si vite !',
        description: "Votre nom d'utilisateur est resté inchangé.",
      });
      return;
    }

    setLoading(true);
    try {
      const newUsername = await saveUsername({ username: username });
      await update({
        ...session,
        user: {
          ...session?.user,
          name: newUsername,
        },
      });
      toast({
        title: 'Succès',
        description:
          "Votre nom d'utilisateur a été mis à jour avec succès ! Propre.",
      });
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh', description: message, variant: 'destructive' });
    }
    setLoading(false);
  };

  return { form, loading, onSubmit };
};
