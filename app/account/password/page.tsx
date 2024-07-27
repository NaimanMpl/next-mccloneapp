import AccountEditPasswordForm from '@/app/components/account/AccountEditPasswordForm';
import AccountPageWrapper from '@/app/components/account/AccountPageWrapper';
import React from 'react';

const ResetPasswordPage = () => {
  return (
    <AccountPageWrapper>
      <AccountEditPasswordForm />
    </AccountPageWrapper>
  );
};

export default ResetPasswordPage;
