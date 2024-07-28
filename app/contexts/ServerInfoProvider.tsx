import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useGetServerQuery } from '../api/slice';
import { ServerInfo } from '../models/serverinfo.model';
import { getServerInfo } from '../services/serverservice';

interface IServerInfoContext {
  loading: boolean;
  serverInfo: ServerInfo | undefined;
  setServerInfo: Dispatch<SetStateAction<ServerInfo | undefined>>;
}

const ServerInfoContext = createContext<IServerInfoContext | undefined>(
  undefined
);

export const ServerInfoProvider = ({ children }: { children: ReactNode }) => {
  const [serverInfo, setServerInfo] = useState<ServerInfo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT);
    socket.onmessage = (event) => {
      const data: ServerInfo = JSON.parse(event.data);
      setServerInfo(data);
    };
  }, []);

  useEffect(() => {
    const fetchServerInfo = async () => {
      const serverInfo = await getServerInfo();
      setServerInfo(serverInfo);
      setLoading(false);
    };

    setLoading(true);
    fetchServerInfo();
  }, []);

  return (
    <ServerInfoContext.Provider value={{ serverInfo, setServerInfo, loading }}>
      {children}
    </ServerInfoContext.Provider>
  );
};

export const useServerInfo = () => {
  const context = useContext(ServerInfoContext);
  if (!context) {
    throw new Error('useServerInfo must be used wihin a ServerInfoProvider');
  }
  return context;
};
