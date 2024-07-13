import prisma from '@/app/lib/db';
import userMiddleware from '@/app/middlewares/user.middleware';
import { EditPasswordFormData } from '@/app/models/formsdata.model';
import { UserPayload } from '@/app/models/user.model';
import bcrypt from 'bcrypt';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const username = searchParams.get('username');
  const email = searchParams.get('email');
  
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET}) as unknown as UserPayload;

  if (!token) {
    return new Response(JSON.stringify({ message: 'Unauthorized'}), { status: 403 });
  }

  const error = userMiddleware.handlePatch(searchParams);
  if (error) return error;

  try {
    const newUser = await prisma.users.update({
      where: {
        id: token.id
      },
      data: {
        name: username || undefined,
        email: email || undefined
      },
      include: {
        skin: true,
        role: true
      }
    });
    return new Response(JSON.stringify({ message: 'Succès', username: newUser.name, email: newUser.email }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Un problème est survenu'}), { status: 500 });
  }
}

export async function POST(request: Request) {
  const formData: EditPasswordFormData = await request.json();
  const token = await getToken({ req: request as NextRequest, secret: process.env.NEXTAUTH_SECRET }) as unknown as UserPayload;
  
  if (!token) {
    return new Response(JSON.stringify({ message: 'Unauthorized'}), { status: 403 });
  }

  if (!formData.confirmNewPassword || ! formData.newPassword || !formData.oldPassword) {
    return new Response(JSON.stringify({ message: 'Veuillez saisir tout les champs.' }), { status: 400 });
  }

  if (formData.newPassword !== formData.confirmNewPassword) {
    return new Response(JSON.stringify({ message: 'Les mots de passes doivent correspondre.'}), { status: 400 });
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: token.id
      }
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Un problème est survenu.'}), { status: 400 });
    }

    const passwordMatch = await bcrypt.compare(formData.oldPassword, user.password)

    if (!passwordMatch) {
      return new Response(JSON.stringify({ message: 'Mot de passe incorrect.'}), { status: 400 });
    }
    const salt = await bcrypt.genSalt();
    const newHashedPassword = await bcrypt.hash(formData.newPassword, salt);
    await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        password: newHashedPassword
      }
    });

    return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });

  } catch (e) {
    return new Response(JSON.stringify({ message: 'Un problème est survenu.'}), { status: 500 });
  }

}