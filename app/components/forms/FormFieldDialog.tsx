import { FormMessage } from '@/components/ui/form'

interface FormFieldDialogProps {
  children: string,
  error: boolean
}

const FormFieldDialog = ({ children, error }: FormFieldDialogProps) => {
  return (
    <FormMessage className={error ? 'text-destructive' : 'text-green-600'}>{children}</FormMessage>
  )
}

export default FormFieldDialog