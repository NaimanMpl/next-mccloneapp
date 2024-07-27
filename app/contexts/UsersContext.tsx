import { useSearchParams } from 'next/navigation';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../models/user.model';
import { getUsers } from '../services/userservice';

interface IUsersContext {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalUsers: number;
  nextPage: string;
  users: User[];
  loading: boolean;
  setUsers: Dispatch<SetStateAction<User[]>>;
}

export const UsersContext = createContext<IUsersContext | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [nextPage, setNextPage] = useState('');
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') ?? '1';
  const page = parseInt(pageParam) > 0 ? parseInt(pageParam) : 1;
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    const fetchUsers = async () => {
      const { users, total, nextPage } = await getUsers(currentPage);
      setUsers(users);
      setTotalUsers(total);
      setNextPage(nextPage);
      setLoading(false);
    };
    setLoading(true);
    fetchUsers();
  }, [currentPage]);

  return (
    <UsersContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        totalUsers,
        nextPage,
        users,
        loading,
        setUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
