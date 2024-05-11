'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserPayload } from "../models/user.model";
import { getCurrentUser } from "../services/authservice";

export const AuthContext = createContext<AuthPayload | null>(null);

interface Props {
  children: ReactNode
}

export interface AuthPayload {
  user: UserPayload | null, // Modifier ici pour accepter null
}

export const useAuth = () => { useContext(AuthContext); }

export const AuthProvider = ({ children }: Props) => {
  
  const [ payload, setPayload ] = useState<AuthPayload>({ user: null });

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();

      if (currentUser == null) return;

      setPayload({ user: { email: currentUser.email, name: currentUser.name, id: currentUser.id, skin: currentUser.skin } });
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user: payload.user }}>
      {children}
    </AuthContext.Provider>
  )

}
