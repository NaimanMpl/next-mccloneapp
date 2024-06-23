import { redirect } from 'next/navigation';
import React from 'react';
import { getUser } from '../actions/user.action';
import AccountPageContent from '../components/account/AccountPageContent';
import AccountPageWrapper from '../components/account/AccountPageWrapper';

const Dahsboard = async () => {

  const user = await getUser();

  if (!user) {
    redirect('/')
  }

  return (
    <AccountPageWrapper>
      <AccountPageContent />
    </AccountPageWrapper>
  )
}

export default Dahsboard