import UserController from '@/app/controllers/user.controller';
import { RegisterFormData } from '@/app/hooks/useRegisterForm';
import { generateAccessToken, generateRefreshToken, getTokenCookie } from '@/app/lib/auth';
import logger from '@/app/utils/logger';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  const userController = new UserController();
  userController.getUsers();
  return new Response('Ok');
}

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
  
    const userController = new UserController();
    await userController.createUser(user);

    const payload = { username: user.username, email: user.email };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    const accessTokenCookie = getTokenCookie('accessToken', accessToken);
    const refreshTokenCookie = getTokenCookie('refreshToken', refreshToken);

    const response = new Response(JSON.stringify({ username: user.username, email: user.email }), { status: 200 });
    response.headers.append('Set-Cookie', accessTokenCookie);
    response.headers.append('Set-Cookie', refreshTokenCookie);

    return response;

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error(`[Prisma] ${e.message}`);
    } else if (e instanceof Error) {
      logger.error(e.message);
    } else {
      logger.error(e);
    }

    return new Response(JSON.stringify({ error: 'Une erreur est survenue.'}), { status: 500 });
  }
}