import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../models/user.model";
import { getUsers } from "../services/userservice";

interface IUsersContext {
  users: User[],
  loading: boolean,
  setUsers: Dispatch<SetStateAction<User[]>>
}

export const UsersContext = createContext<IUsersContext | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
      setLoading(false);
    }

    setLoading(true);
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, loading, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}