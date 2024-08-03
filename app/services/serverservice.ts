import axios from 'axios';
import { Server } from '../models/server.model';

export const getServerInfo = async (): Promise<Server> => {
  try {
    const { data } = await axios.get<Server>(`/api/servers?primary=true`);
    return data;
  } catch (e) {
    return {
      id: 1,
      ip: '0.0.0.0',
      port: 50000,
      primary: true,
      lastUpdate: new Date().toString(),
      onlineSince: new Date().toString(),
      token: '',
      chatMessages: [],
      onlinePlayers: 0,
      status: 'OFFLINE',
    };
  }
};
