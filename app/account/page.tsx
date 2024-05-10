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
      <AccountInfoCard 
        title='Photo de profil' 
        img='/default-pp.png' 
        tip="C'est toujours mieux avec que sans !"
      >
        <AccountInfoParagraph>Ceci est votre photo de profil.</AccountInfoParagraph>
        <AccountInfoParagraph>Vous pouvez la changer en cliquant desssus.</AccountInfoParagraph>
      </AccountInfoCard>
      <AccountInfoCard 
        title="Nom d'utilisateur" 
        tip="Veuillez ne pas dépasser 20 caractères." 
        button={<Button>Sauvegarder</Button>}
      >
        <AccountInfoParagraph>Veuillez saisir un nouveau nom d'utilisateur</AccountInfoParagraph>
        <Input className='mt-3 w-80' type='text' defaultValue={user.name} />
      </AccountInfoCard>
      <AccountInfoCard 
        title="Adresse email" 
        tip="Les adresses emails doivent êtres vérifiés pour pouvoir se connecter avec." 
        button={<Button>Sauvegarder</Button>}
      >
        <AccountInfoParagraph>Veuillez saisir une adresse email avec laquelle vous souhaitez pouvoir vous connecter.</AccountInfoParagraph>
        <Input className='mt-3 w-80' type='text' defaultValue={user.email} />
      </AccountInfoCard>
      <AccountInfoCard 
        title="Supprimer le compte" 
        tip="Ce n'est qu'un au revoir..." 
        button={
          <DeleteAccontDialog />
        }
        borderColor='border-red-500'
        tipBgColor='bg-destructive'
      >
        <AccountInfoParagraph>Supprime de manière permante votre compte utilisateur du jeu, cette action n'est pas réversible.</AccountInfoParagraph>
      </AccountInfoCard>
    </AccountPageWrapper>
  )
}

export default Dahsboard