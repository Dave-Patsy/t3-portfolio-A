import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Adapter } from "next-auth/adapters";
// import { env } from "@/env";
import { db } from "@/server/db";
import { type DefaultJWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import type { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUser } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "@/data/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db) as Adapter,
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  
  callbacks: {
    async signIn({user,account}){
      if(account?.provider !== 'credentials') return true
      
      const existingUser = await getUserById(user.id!)
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (!existingUser || !existingUser?.emailVerified) return false;

      
      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUser(existingUser.id)
        if(!twoFactorConfirmation) return false

        await db.twoFactorConfirmation.delete({
          where:{id:twoFactorConfirmation.id}
        })
      }
      return true
    },
    async session({ session, token }) {
      
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      if(session.user) {
        session.user.name = token.name
        session.user.name = token.email
        session.user.isOAuth = token.isOAuth
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.name = existingUser.name
      token.email = existingUser.email
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
      isTwoFactorEnabled?: boolean;
      isOAuth: boolean;
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
  interface JWT extends DefaultJWT {
    /** OpenID ID Token */
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth: boolean;
  }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => auth();
