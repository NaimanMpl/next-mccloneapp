'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserPayload } from "../models/user.model";
import { getCurrentUser } from "../services/authservice";

export const AuthContext = createContext<AuthPayload | null>(null);

interface Props {
  children: ReactNode
}

interface AuthPayload {
  user: UserPayload,
  loggedIn: boolean
}

export const useAuth = () => { useContext(AuthContext); }

export const AuthProvider = ({ children }: Props) => {
  
  const [ user, setUser ] = useState<UserPayload>({
    email: '',
    name: ''
  });
  const [ logged, setLogged ] = useState(false);

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();

      if (currentUser == null) return;

      setUser({ email: currentUser.email, name: currentUser.name });
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, loggedIn: logged }}>
      {children}
    </AuthContext.Provider>
  )

}