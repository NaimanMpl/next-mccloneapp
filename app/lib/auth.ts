import cookie from 'cookie';
import { jwtVerify, SignJWT } from 'jose';
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from 'next/server';
import { resolve } from 'path';
import { UserPayload } from '../models/user.model';

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

export const isAuthenticated = async (request: NextRequest, cookies: ReadonlyRequestCookies): Promise<UserPayload | null> => {
  const accessToken = cookies.get('accessToken');

  if (!accessToken) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(accessToken.value, accessTokenKey, { algorithms: ['HS256'] });
    console.log(await jwtVerify(accessToken.value, accessTokenKey, { algorithms: ['HS256'] }))
    const user: UserPayload = { email: payload.email as string, name: payload.name as string };

    return new Promise(resolve => resolve({ email: user.email, name: user.name }));
  } catch (e) {
    const refreshToken = cookies.get('refreshToken');
    
    if (!refreshToken) {
      return null;
    }

    console.log(await jwtVerify(refreshToken.value, refreshTokenKey, { algorithms: ['HS256'] }))
    const { payload } = await jwtVerify(refreshToken.value, refreshTokenKey, { algorithms: ['HS256'] });

    if (!payload) {
      return null;
    }

    const newAccessToken = await generateAccessToken(payload);
    const accessTokenCookie = getTokenCookie('accessToken', newAccessToken);

    request.headers.append('Set-Cookie', accessTokenCookie);
    
    const user: UserPayload = { email: payload.email as string, name: payload.name as string };

    return new Promise(resolve => resolve({ email: user.email, name: user.name }));
  }
}