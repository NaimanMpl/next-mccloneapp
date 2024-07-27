import { User } from '@/app/models/user.model';

export const USERS_MOCK: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@domain.com',
    admin: true,
    createdAt: new Date('2024-05-07'),
    role: {
      id: 1,
      name: 'Joueur',
      score: 0,
    },
    skin: {
      id: 1,
      link: 'someawesomeskinlink.com/',
    },
    profileIconUrl: 'someawesomeprofileicon.com',
  },
];
