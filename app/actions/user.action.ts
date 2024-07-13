import axios from "axios";
import { UserPayload } from "../models/user.model";

interface Session {
  user: UserPayload
}

export const getUser = async (): Promise<Session | null> => {

  try {
    const { data } = await axios.get<Session>(`${process.env.API_ENDPOINT!}/api/auth/session`);
    return data;
  } catch (e) {
    return null;
  }

}