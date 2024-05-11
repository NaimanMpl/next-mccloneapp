export interface User {
  name: string,
  email: string,
  password: string,
  createdAt: string
}

export interface UserPayload {
  id: string,
  name: string,
  email: string,
  skin: string
}