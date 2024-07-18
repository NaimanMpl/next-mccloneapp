import { ServerInfo } from "@prisma/client";
import axios from "axios";

export const getServerInfo = async () => {
  try {
    const { data } = await axios.get<ServerInfo>('/api/server/infos');
    return data;
  } catch (e) {
    return null;
  }
}