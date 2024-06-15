import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useEditPermissions = () => {

  const FormSchema = z.object({
    permission: z.string()
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {

  }

  return { form, onSubmit };
}