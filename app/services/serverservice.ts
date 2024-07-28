import axios from 'axios';
import { ServerInfo } from '../models/serverinfo.model';

export const getServerInfo = async (): Promise<ServerInfo> => {
  try {
    const { data } = await axios.get<ServerInfo>('/api/server/infos');
    return data;
  } catch (e) {
    return {
      id: 1,
      ip: '0.0.0.0',
      lastUpdate: new Date().toString(),
      messagesCount: 0,
      onlinePlayers: 0,
      status: 'OFFLINE',
    };
  }
};
