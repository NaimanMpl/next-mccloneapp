'use server';
import { getUser } from "@/app/actions/user.action";
import { updateTokens } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { UserPayload } from "@/app/models/user.model";
import logger from "@/app/utils/logger";
import { put } from "@vercel/blob";

export const uploadFile = async (folder: string, formData: FormData): Promise<string> => {

  const user = await getUser();

  if (user == null) {
    throw new Error();
  }

  const file = formData.get('file') as File;
  const extension = file.name.split('.').pop();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const currentSubmissions = await prisma.submission.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: oneHourAgo
      }
    }
  });

  if (currentSubmissions > 2) {
    throw new Error("Vous avez envoyer trop d'images ! Veuillez réessayer plus tard.")
  }


  const blob = await put(`${folder}/${user.id}.${extension}`, file, {
    access: 'public'
  });
  
  try {
    createSubmission({ userId: user.id });
    await prisma.skin.update({
      where: {
        userId: user.id
      },
      data: {
        link: blob.url
      }
    });
  } catch (e) {
    throw e;
  }

  const newPayload: UserPayload = { ...user, skin: blob.url };
  await updateTokens(newPayload);
  
  return blob.url;
}

export const uploadAvatar = async (formData: FormData): Promise<string> => {
  const user = await getUser();

  if (user == null) {
    throw new Error('Un problème est survenu');
  }

  const file = formData.get('file') as File;
  const extension = file.name.split('.').pop();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const currentSubmissions = await prisma.submission.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: oneHourAgo
      }
    }
  });

  if (currentSubmissions > 2) {
    throw new Error("Vous avez envoyer trop d'images ! Veuillez réessayer plus tard.")
  }

  const blob = await put(`avatars/${user.id}.${extension}`, file, {
    access: 'public'
  });
  
  try {

    createSubmission({ userId: user.id });
    await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        profileIconUrl: blob.url
      }
    })
  } catch (e) {
    logger.error(e);
    throw new Error('Un problème est survenu');
  }

  const newPayload: UserPayload = { ...user, profileIconUrl: blob.url };
  await updateTokens(newPayload);
  
  return blob.url;
}

const createSubmission = async ({ userId }: { userId: string}) => {
  try {
    await prisma.submission.create({
      data: {
        userId: userId
      }
    });
  } catch (e) {
    throw e;
  }
}