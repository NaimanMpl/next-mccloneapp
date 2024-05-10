import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { ReactNode } from 'react'

interface FormWrapperProps {
  title: string,
  error: string,
  description: string,
  children: ReactNode
}

const FormWrapper = ({ title, error, description, children }: FormWrapperProps) => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Card className='mx-auto max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl'>{title}</CardTitle>
          <CardDescription className='text-red-500'>{error}</CardDescription>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

export default FormWrapper