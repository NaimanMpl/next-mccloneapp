import { redirect } from 'next/navigation';
import React from 'react';
import { getUser } from '../actions/user.action';
import DashboardHeader from '../components/account/AccountHeader';
import AccountInfoButton from '../components/account/AccountInfoButton';
import AccountInfoCard from '../components/account/AccountInfoCard';
import AccountInfoParagraph from '../components/account/AccountInfoParagraph';
import AccountInput from '../components/account/AccountInput';
import AccountPageWrapper from '../components/account/AccountPageWrapper';
import Header from '../components/Header';
import Button from '../components/ui/OldButton';

const Dahsboard = async () => {

  const user = await getUser();

  if (!user) {
    redirect('/')
  }

  return (
    <AccountPageWrapper>
      <AccountInfoCard title='Photo de profil' img='/default-pp.png' tip="C'est toujours mieux avec que sans !">
        <AccountInfoParagraph>Ceci est votre photo de profil.</AccountInfoParagraph>
        <AccountInfoParagraph>Vous pouvez la changer en cliquant desssus.</AccountInfoParagraph>
      </AccountInfoCard>
      <AccountInfoCard title="Nom d'utilisateur" tip="Veuillez ne pas dépasser 20 caractères." button={<AccountInfoButton text='Sauvegarder' />}>
        <AccountInfoParagraph>Veuillez saisir un nouveau nom d'utilisateur</AccountInfoParagraph>
        <AccountInput defaultValue={user.name} type='text' />
      </AccountInfoCard>
      <AccountInfoCard title="Adresse email" tip="Les adresses emails doivent êtres vérifiés pour pouvoir se connecter avec." button={<AccountInfoButton text='Sauvegarder' />}>
        <AccountInfoParagraph>Veuillez saisir une adresse email avec laquelle vous souhaitez pouvoir vous connecter.</AccountInfoParagraph>
        <AccountInput defaultValue={user.email} type='text' />
      </AccountInfoCard>
      <AccountInfoCard 
        title="Supprimer le compte" 
        tip="Ce n'est qu'un au revoir..." 
        button={
          <AccountInfoButton backgroundColor='bg-red-500' color='text-neutral-50' text='Supprimer' />
        }
        borderColor='border-red-500'
        tipBgColor='bg-red-950'
      >
        <AccountInfoParagraph>Supprime de manière permante votre compte utilisateur du jeu, cette action n'est pas réversible.</AccountInfoParagraph>
      </AccountInfoCard>
    </AccountPageWrapper>
  )
}

export default Dahsboard