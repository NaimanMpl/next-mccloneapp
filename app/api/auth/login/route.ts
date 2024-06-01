import { LoginFormData } from "@/app/hooks/useLoginForm";
import { generateAccessToken, generateRefreshToken, getTokenCookie } from "@/app/lib/auth";
import { UserPayload } from "@/app/models/user.model";
import logger from "@/app/utils/logger";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  
  const userFormData: LoginFormData = await request.json();
  const { email, password } = userFormData;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Veuillez remplir tout les champs.' }), { status: 400 });
  }

  if (email.length === 0 || password.length === 0) {
    return new Response(JSON.stringify({ message: 'Veuillez remplir tout les champs.' }), { status: 400 });
  }

  try {
    const prisma = new PrismaClient();
    const user = await prisma.users.findUnique({
      where: { email: email },
      include: { skin: true }
    });

    if (user === null || user === undefined) {
      return new Response(JSON.stringify({ message: 'Email ou mot de passe incorrect.' }), { status: 400 });
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return new Response(JSON.stringify({ message: 'Email ou mot de passe incorrect.' }), { status: 400 });
    }
  
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    if (!emailRegex.test(user.email)) {
      return new Response(JSON.stringify({ error: 'Email ou mot de passe incorrect.'}), { status: 400 });
    }
  
    const payload: UserPayload = { id: user.id, email: user.email, name: user.name, skin: user.skin!.link };
  
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
  
    const accessTokenCookie = getTokenCookie('accessToken', accessToken);
    const refreshTokenCookie = getTokenCookie('refreshToken', refreshToken);
  
    const response = new Response(JSON.stringify({ message: 'Authenticated' }), { status: 200 });
    response.headers.append('Set-Cookie', accessTokenCookie);
    response.headers.append('Set-Cookie', refreshTokenCookie);

    return response;
  } catch (e) {
    logger.error(e);
    return new Response(JSON.stringify({ message: 'Une erreur est survenue.' }), { status: 500 });
  }
}