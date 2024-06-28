import UserController from '@/app/controllers/user.controller';
import { RegisterFormData } from '@/app/hooks/useRegisterForm';
import { generateAccessToken, generateRefreshToken, getTokenCookie } from '@/app/lib/auth';
import userMiddleware from '@/app/middlewares/user.middleware';
import { registerUser } from '@/app/services/authservice';
import logger from '@/app/utils/logger';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function POST(request: Request) {
  const user: RegisterFormData = await request.json();
  const error = userMiddleware.handleRegister(user);

  if (error) {
    return error;
  }
  
  try {
    
    const userController = new UserController();
    const userData = await userController.createUser(user);

    const payload = { id: userData.id, username: userData.name, email: userData.email };

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

    if (e instanceof PrismaClientKnownRequestError) {
      return new Response(JSON.stringify({ message: 'Une erreur est survenue.'}), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'Une erreur est survenue.'}), { status: 500 });
  }
}