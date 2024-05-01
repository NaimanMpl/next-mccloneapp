export interface User {
  name: string,
  email: string,
  password: string,
  createdAt: string
}

export interface UserPayload {
  name: string,
  email: string
}