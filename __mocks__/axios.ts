import mockAxios from 'jest-mock-axios';

export const SESSION_MOCK = {
  user: {
    id: "1",
    admin: false,
    email: "johndoe@domain.com",
    name: 'John Doe',
    profileIconUrl: 'awesomeprofilepicture.com/pp/1234',
    role: {
    id: 1,
    name: 'Joueur',
    score: 0
    },
    skin: 'awesomeskin.com/skin/1234'
  }
}

export default mockAxios;