'use client';
import { Form } from '@/components/ui/form';
import React, { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface AccountFormProps {
  form: UseFormReturn<any>,
  children: ReactNode
}

const AccountForm = ({ form, children }: AccountFormProps) => {

  

  return (
    <Form {...form}>
      {children}
    </Form>
  )
}

export default AccountForm