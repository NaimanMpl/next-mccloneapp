import { FormMessage } from '@/components/ui/form'
import React from 'react'

interface FormFieldDialogProps {
  children: string,
  error: boolean
}

const FormFieldDialog = ({ children, error }: FormFieldDialogProps) => {
  return (
    <FormMessage className={error ? 'text-red-500' : 'text-green-500'}>{children}</FormMessage>
  )
}

export default FormFieldDialog