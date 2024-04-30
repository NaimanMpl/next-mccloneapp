import { LoginFormData } from "@/app/hooks/useLoginForm";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  
  const userFormData: LoginFormData = await request.json();
  const { email, password } = userFormData;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Veuillez remplir tout les champs.' }), { status: 400 });
  }

  if (email.length === 0 || password.length === 0) {
    return new Response(JSON.stringify({ message: 'Veuillez remplir tout les champs.' }), { status: 400 });
  }

  const prisma = new PrismaClient();
  const user = await prisma.users.findUnique({
    where: { email: email }
  });

  if (user === null || user === undefined) {
    return new Response(JSON.stringify({ message: 'Email ou mot de passe incorrect.' }), { status: 400 });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return new Response(JSON.stringify({ message: 'Email ou mot de passe incorrect.' }), { status: 400 });
  }

  const accessToken = jwt.sign({ username: user.name }, process.env.JWT_SECRET_KEY, { expiresIn: MAX_AGE });
  const serialized = cookie.serialize('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/'
  });

  return new Response(
    JSON.stringify({ message: 'Authentificated', accessToken: accessToken }),
    { 
      status: 200,
      headers: {
        'Set-Cookie' : serialized
      }
  });

}