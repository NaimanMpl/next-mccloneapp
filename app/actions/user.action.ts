import axios from "axios";
import { UserPayload } from "../models/user.model";

export const getUser = async (): Promise<UserPayload | null> => {

  try {
    const { data } = await axios.get<UserPayload>(`${process.env.API_ENDPOINT!}/api/auth/session`);
    return data;
  } catch (e) {
    return null;
  }

}