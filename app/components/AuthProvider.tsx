'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { UserPayload } from "../models/user.model";
import { getCurrentUser } from "../services/authservice";

export const AuthContext = createContext<AuthPayload>({ user: null, setUser: () => {} });

interface Props {
  children: ReactNode
}

export interface AuthPayload {
  user: UserPayload | null,
  setUser: (user: UserPayload) => void
}

export const useAuth = () => { useContext(AuthContext); }

export const AuthProvider = ({ children }: Props) => {
  
  const [ user, setUser ] = useState<UserPayload | null>(null);

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();

      if (currentUser == null) return;

      setUser({ email: currentUser.email, name: currentUser.name, id: currentUser.id, skin: currentUser.skin });
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )

}
