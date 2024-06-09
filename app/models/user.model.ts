export interface User {
  name: string,
  email: string,
  password: string,
  createdAt: string
}

export interface Role {
  id: number,
  name: string,
  score: number
}

export interface UserPayload {
  id: string,
  name: string,
  email: string,
  skin: string,
  role: Role
}