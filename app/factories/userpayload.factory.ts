import { getBase64Image } from '@/lib/utils';
import { User, UserPayload } from '../models/user.model';

export const UserPayloadFactory = async (user: User): Promise<UserPayload> => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    skin: user.skin.link,
    role: user.role,
    admin: user.admin,
    profileIconUrl: user.profileIconUrl || process.env.DEFAULT_PP_URL!,
  };
};
