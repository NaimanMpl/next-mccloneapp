import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRoles } from "../contexts/RolesContext";
import { RoleEnum, RolesDict } from "../models/role.model";
import { addPermission } from "../services/roleservice";

interface AddPermissionHookProps {
  authorId: string,
  roleName: RoleEnum,
}

export const useAddPermissionForm = ({ authorId, roleName }: AddPermissionHookProps) => {

  const [ loading, setLoading ] = useState(false);
  const { roles, setRoles } = useRoles();
  const FormSchema = z.object({
    permissionName: z.string()
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { permissionName } = values;
    console.log('Hello !')
    setLoading(true);
    try {
      const permission = await addPermission({ name: permissionName, author: { id: authorId }, role: { id: RolesDict[roleName] } });
      toast({ title: 'Succès', description: `Le role ${roleName} hérite maintenant de la permission ${permission.name}`, variant: 'default'});
      setRoles(roles => roles.map(role => ({...role, permissions: [...role.permissions, permission]})));
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh', description: message, variant: 'default'});
    }
    setLoading(false);
  }

  return { form, onSubmit, loading };
}