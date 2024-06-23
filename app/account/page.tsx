import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUser } from '../actions/user.action';
import DashboardHeader from '../components/account/AccountHeader';
import AccountInfoButton from '../components/account/AccountInfoButton';
import AccountInfoCard from '../components/account/AccountInfoCard';
import AccountInfoParagraph from '../components/account/AccountInfoParagraph';
import AccountInput from '../components/account/AccountInput';
import AccountPageContent from '../components/account/AccountPageContent';
import AccountPageWrapper from '../components/account/AccountPageWrapper';
import DeleteAccontDialog from '../components/account/DeleteAccontDialog';
import Header from '../components/Header';

const Dahsboard = async () => {

  const user = await getUser();

  if (!user) {
    redirect('/')
  }

  return (
    <AccountPageWrapper>
      <AccountPageContent user={user} />
    </AccountPageWrapper>
  )
}

export default Dahsboard