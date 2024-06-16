'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { UserPayload } from "../models/user.model";
import { getCurrentUser } from "../services/authservice";

interface IAuthContext {
  user: UserPayload | null,
  setUser: Dispatch<SetStateAction<UserPayload | null>>
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface Props {
  children: ReactNode
}

export const useAuth = () => { 
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  } 
  return context;
}

export const AuthProvider = ({ children }: Props) => {
  
  const [ user, setUser ] = useState<UserPayload | null>(null);

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();
      if (currentUser == null) return;

      setUser({ email: currentUser.email, name: currentUser.name, id: currentUser.id, skin: currentUser.skin, role: currentUser.role, admin: currentUser.admin });
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )

}
