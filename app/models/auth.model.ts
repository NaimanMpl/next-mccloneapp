import cookie from 'cookie';
import { SignJWT } from 'jose';

export const generateAccessToken = async (payload: any): Promise<String> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 min")
    .sign(process.env.JWT_SECRET_KEY);
}

export const generateRefreshToken = async (payload: any): Promise<String> => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(process.env.JWT_REFRESH_KEY);
}

export const getTokenCookie = (name: string, token: string): string => {
  return cookie.serialize(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
}