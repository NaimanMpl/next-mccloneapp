export interface Role {
  id: number,
  name: string,
  score: number
}

export interface Skin {
  id: number,
  link: string,
}

export interface User {
  id: string,
  name: string,
  email: string,
  createdAt: Date,
  admin: boolean,
  role: Role,
  skin: Skin,
  profileIconUrl: string
}

export interface UserPayload {
  id: string,
  name: string,
  email: string,
  skin: string,
  role: Role,
  admin: boolean,
  profileIconUrl: string
}

export interface UsersPagination {
  total: number,
  nextPage: string,
  users: User[]
}