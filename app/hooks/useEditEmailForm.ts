import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../components/AuthProvider';
import { EditUserFormData, EditUsernameFormData } from '../models/formsdata.model';
import { saveEmail, saveUsername } from '../services/userservice';

export const useEditEmailForm = ({ defaultValue }: { defaultValue: string}) => {

  const { user, setUser } = useAuth();
  const [ loading, setLoading ] = useState(false);
  const FormSchema = z.object({
    email: z.string().email({ message: 'Veuillez renseigner une adresse mail valide' }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: defaultValue
    }
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { email } = values;
    
    if (email === user?.email) {
      toast({ title: 'Pas si vite !', description: 'Votre adresse mail est restée inchangée.'});
      return;
    }

    setLoading(true);
    try {
      const newEmail = await saveEmail({ email: email });
      setUser(user => ({...user!, email: newEmail }));
      toast({ title: 'Succès', description: "Votre adresse email a été mis à jour avec succès !" });
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh', description: message, variant: 'destructive' });
    }
    setLoading(false);
  }

  return { form, loading, onSubmit }

}