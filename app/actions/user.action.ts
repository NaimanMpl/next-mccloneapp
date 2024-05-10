import { cookies } from "next/headers";
import { UserPayload } from "../models/user.model";

export const getUser = async (): Promise<UserPayload | null> => {
  const res = await fetch('http://localhost:3000/api/auth/me', 
  { 
    method: 'GET',
    headers: {
      Cookie: cookies().toString()
    } 
  });
  return !res.ok ? null : await res.json() as UserPayload;
}