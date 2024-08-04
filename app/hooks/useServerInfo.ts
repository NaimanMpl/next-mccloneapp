import { useEffect, useState } from 'react';
import { Server } from '../models/server.model';
import { getServerInfo } from '../services/serverservice';

export const useServerInfo = () => {
  const [serverInfo, setServerInfo] = useState<Server | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServerInfo = async () => {
      const serverInfo = await getServerInfo();
      setServerInfo(serverInfo);
      setLoading(false);
    };
    fetchServerInfo();
  }, []);

  return { serverInfo, loading };
};
