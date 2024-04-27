import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Adapter } from "next-auth/adapters";
// import { env } from "@/env";
import { db } from "@/server/db";
import { type JWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import type { $Enums, UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    // signOut: '/',
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db) as Adapter,
  events: {
    async linkAccount({ user }) {
      console.log("linked user: ", user);
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
      console.log('linked user: ', user)
    },
  },
  
  callbacks: {
    async signIn({user,account}){
      if(account?.provider !== 'credentials') return true
      const existingUser = await getUserById(user.id!)

      if(!existingUser?.emailVerified) return false

      // TODO: Add 2FA check
      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      token.role = existingUser.role;

      return token;
    },
  },
});

declare module "next-auth" {
  interface Session extends DefaultSession {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user: {
      id: string;
      role: UserRole;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   role: UserRole;
  // }
}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: UserRole;
  }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => auth();
