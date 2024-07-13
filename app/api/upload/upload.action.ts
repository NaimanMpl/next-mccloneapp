'use server';
import prisma from "@/app/lib/db";
import { UploadError } from "@/app/models/error.model";
import { UserPayload } from "@/app/models/user.model";
import logger from "@/app/utils/logger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { put } from "@vercel/blob";
import { fileTypeFromBuffer } from 'file-type';

const hasCorrectMime = async (file: ArrayBuffer) => {
  const mimeTypes = ['image/jpeg', 'image/png'];
  const fileData = await fileTypeFromBuffer(Buffer.from(file));
  return fileData && mimeTypes.includes(fileData.mime);
};

export const uploadSkin = async (user: UserPayload, formData: FormData): Promise<string> => {

  const file = formData.get('file') as File;

  if (!await hasCorrectMime(await file.arrayBuffer())) {
    throw new UploadError('Les formats acceptés sont PNG ou JPG !');
  }

  const extension = file.name.split('.').pop();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  try {

    const currentSubmissions = await prisma.submission.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: oneHourAgo
        }
      }
    });
  
    if (currentSubmissions > 2) {
      throw new UploadError("Vous avez envoyer trop d'images ! Veuillez réessayer plus tard.")
    }
  
    const blob = await put(`skins/${user.id}.${extension}`, file, {
      access: 'public'
    });
    createSubmission({ userId: user.id });
    await prisma.skin.update({
      where: {
        userId: user.id
      },
      data: {
        link: blob.url
      }
    });

    return blob.url;
  } catch (e) {
    if (e instanceof UploadError) {
      throw e;
    }
    throw new Error('Un problème est survenu');
  }
}

export const uploadAvatar = async (user: UserPayload, formData: FormData): Promise<string> => {

  const file = formData.get('file') as File;

  if (!await hasCorrectMime(await file.arrayBuffer())) {
    throw new UploadError('Les formats acceptés sont PNG ou JPG !');
  }

  const extension = file.name.split('.').pop();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  try {
    const currentSubmissions = await prisma.submission.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: oneHourAgo
        }
      }
    });
  
    if (currentSubmissions > 2) {
      throw new UploadError("Vous avez envoyer trop d'images ! Veuillez réessayer plus tard.")
    }
  
    const blob = await put(`avatars/${user.id}.${extension}`, file, {
      access: 'public'
    });

    createSubmission({ userId: user.id });
    await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        profileIconUrl: blob.url
      }
    });

    return blob.url;
  } catch (e) {
    logger.error(e);
    if (e instanceof UploadError) {
      throw e;
    }
    if (e instanceof PrismaClientKnownRequestError) {
      throw new Error('Un problème est survenu');
    }
    throw e;
  }

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