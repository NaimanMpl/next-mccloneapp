import { UserPayload } from "@/app/models/user.model";
import { DefaultUser } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: UserPayload & DefaultUser['user']
  }

  interface JWT extends UserPayload {
    
  }
}