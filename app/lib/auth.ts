import cookie from 'cookie';
import { jwtVerify, JWTVerifyResult, SignJWT } from 'jose';
import { JWSSignatureVerificationFailed } from 'jose/errors';
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { UserPayload } from '../models/user.model';
import logger from '../utils/logger';

interface JwtUserPayload extends JWTVerifyResult {
  payload: UserPayload; // Assurez-vous que cela correspond à la structure de votre payload
}

const accessTokenKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const refreshTokenKey = new TextEncoder().encode(process.env.JWT_REFRESH_KEY);

export const generateAccessToken = async (payload: any): Promise<string> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 min')
    .sign(accessTokenKey);
}

export const generateRefreshToken = async (payload: any): Promise<string> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day')
    .sign(refreshTokenKey);
}

export const getTokenCookie = (name: string, token: string): string => {
  return cookie.serialize(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
}


export const updateTokens = async (payload: UserPayload) => {
  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);
  
  cookies().set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  })

  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  })
}

const isUserPayload = (object: any): object is UserPayload => {
  const keys: (keyof UserPayload)[] = ['id', 'email', 'name', 'skin', 'role', 'admin', 'profileIconUrl'];

  for (const key of keys) {
    if (!(key in object)) {
      return false;
    }
  }

  return true;
}

export const isAuthenticated = async (request: NextRequest, cookies: ReadonlyRequestCookies): Promise<UserPayload | null> => {
  const accessToken = cookies.get('accessToken');

  if (!accessToken || accessToken.value.length === 0) {
    return null;
  }

  try {
    const { payload }: JwtUserPayload = await jwtVerify(accessToken.value, accessTokenKey, { algorithms: ['HS256'] });
    
    if (!payload) {
      return null;
    }

    const user: UserPayload = { ...payload };

    return new Promise(resolve => resolve({ ...user }));
  } catch (e) {

    const refreshToken = cookies.get('refreshToken');
    
    if (!refreshToken || refreshToken.value.length === 0) {
      return null;
    }

    try {
      const { payload }: JwtUserPayload = await jwtVerify(refreshToken.value, refreshTokenKey, { algorithms: ['HS256'] });

      if (!payload) {
        return null;
      }

      const newAccessToken = await generateAccessToken(payload);
      const accessTokenCookie = getTokenCookie('accessToken', newAccessToken);
  
      request.headers.append('Set-Cookie', accessTokenCookie);
      
      const user: UserPayload = { ...payload };
  
      return new Promise(resolve => resolve({ ...user }));
    } catch (e) {
      if (!(e instanceof JWSSignatureVerificationFailed)) {
        logger.error(e);
      }
      return null;
    }
  }
}