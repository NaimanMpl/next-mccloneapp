import axios from 'axios';
import { ServerInfo } from '../models/serverinfo.model';

export const getServerInfo = async () => {
  try {
    const { data } = await axios.get<ServerInfo>('/api/server/infos');
    return data;
  } catch (e) {
    return null;
  }
};
