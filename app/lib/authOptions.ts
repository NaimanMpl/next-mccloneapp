import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserPayloadFactory } from '../factories/userpayload.factory';
import { User } from '../models/user.model';
import prisma from './db';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Se connecter',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@domain.com'
        },
        password: { label: 'password', type: 'password'}
      },

      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const user = await prisma.users.findFirst({
            where: {
              email: credentials.email
            },
            include: {
              skin: true,
              role: true
            }
          });
  
          if (!user) {
            return null;
          }

          const validPassword = await bcrypt.compare(credentials.password, user.password);
          if (!validPassword) {
            return null;
          }
          
          const payload = await UserPayloadFactory(user as User);
          return payload;

        } catch (e) {
          return null;
        }

      },

    })
  ],
  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        return { ...user }
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  }
}

export default authOptions;