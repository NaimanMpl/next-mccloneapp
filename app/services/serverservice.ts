import axios from 'axios';
import { Server } from '../models/server.model';

export const getServerInfo = async (): Promise<Server> => {
  try {
    const { data } = await axios.get<Server>(
      `/api/servers/${process.env.NEXT_PUBLIC_MAIN_SERVER_ID}`
    );
    return data;
  } catch (e) {
    return {
      id: 1,
      ip: '0.0.0.0',
      lastUpdate: new Date().toString(),
      onlineSince: new Date().toString(),
      token: '',
      chatMessages: [],
      onlinePlayers: 0,
      status: 'OFFLINE',
    };
  }
};
