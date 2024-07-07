import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRoles } from '../contexts/RolesContext';
import { addRole } from '../services/roleservice';

export const useAddRoleForm = () => {
  
  const { roles, setRoles } = useRoles();
  const FormSchema = z.object({
    name: z.string().optional()
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { name } = values;
    try {
      
      if (!name || name.length < 2) {
        toast({ title: 'Pas si vite !', description: "Le nom du role doit contenir au moins 2 caractères."});
        return;
      }

      const role = await addRole({ name: name });
      setRoles([...roles, role]);
      toast({ title: 'Succès', description: `Le role ${role.name} a été ajouté`, variant: 'default' });
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh', description: message, variant: 'destructive'});
    }
  }

  return { FormSchema, form, onSubmit }

}