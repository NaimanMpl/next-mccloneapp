import UserController from '@/app/controllers/user.controller';
import { RegisterFormData } from '@/app/hooks/useRegisterForm';
import { generateAccessToken, generateRefreshToken, getTokenCookie } from '@/app/lib/auth';
import logger from '@/app/utils/logger';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  const user: RegisterFormData = await request.json();
  
  if (!user.username || !user.email || !user.password || !user.confirmPassword) {
    return new Response(JSON.stringify({ error: 'Veuillez renseigner tout les champs.' }), { status: 400 });
  }

  if (user.username.length === 0 || user.email.length === 0 || user.password.length === 0 || user.confirmPassword.length === 0) {
    return new Response(JSON.stringify({ error: 'Veuillez renseigner tout les champs.' }), { status: 400 });
  }

  if (user.password !== user.confirmPassword) {
    return new Response(JSON.stringify({ error: 'Les 2 mots de passes doivent être identiques.' }), { status: 400 });
  }

  const emailRegex = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/;

  if (!emailRegex.test(user.email)) {
    return new Response(JSON.stringify({ error: 'Veuillez renseigner une adresse email valide !'}), { status: 400 });
  }

  try {
  
    const res = await fetch(process.env.AUTH_SERVER + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(user)
    })
    
    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ message: data.message }), { status: res.status });
    }

    const payload = { id: data.id, username: data.username, email: data.email };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    const accessTokenCookie = getTokenCookie('accessToken', accessToken);
    const refreshTokenCookie = getTokenCookie('refreshToken', refreshToken);

    const response = new Response(JSON.stringify({ user: payload, message: 'Registered' }), { status: 200 });
    response.headers.append('Set-Cookie', accessTokenCookie);
    response.headers.append('Set-Cookie', refreshTokenCookie);

    return response;

  } catch (e) {
    logger.error(e);
    return new Response(JSON.stringify({ message: 'Une erreur est survenue.'}), { status: 500 });
  }
}