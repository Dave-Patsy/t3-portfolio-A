/* eslint-disable @typescript-eslint/no-unsafe-argument */
import authConfig from "./server/auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { env } from "./env";


const {auth} = NextAuth(authConfig)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default auth( (req) => {
  const {nextUrl, url} = req
  const reqUrl = new URL(url)
  console.log("url in middleware: ", reqUrl);
  console.log("url pathname in middleware: ", reqUrl.pathname);
  console.log("url hostname in middleware: ", reqUrl.hostname);
  console.log("url VERCEL_URL in middleware: ", process.env.VERCEL_URL);
  // console.log("url VERCEL_URL in middleware: ", process.env.VERCEL_URL);
  console.log("url VERCEL_URL in middleware: ", env.NEXTAUTH_URL);
  console.log(
    "env url NEXT_PUBLIC_APP_URL in middleware: ",
    process.env.NEXT_PUBLIC_APP_URL,
  );
  console.log("NEXT_PUBLIC_APP_URL in middleware: ", env.NEXT_PUBLIC_VERCEL_URL);
    
  const isLoggidIn = !!req.auth
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(reqUrl.pathname);
  const isAuthRoute = authRoutes.includes(reqUrl.pathname);
  
  if(isApiAuthRoute){
    return null
  }

  console.log(
    "auth route redirect: ",
    new URL(DEFAULT_LOGIN_REDIRECT, env.NEXT_PUBLIC_VERCEL_URL),
  );
  if (isAuthRoute) {
    if(isLoggidIn){
      return Response.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, env.NEXT_PUBLIC_VERCEL_URL),
      );
    }
    return null
  }
  console.log(
    "auth not public redirect: ",
    new URL("/auth/login", env.NEXT_PUBLIC_VERCEL_URL),
  );
  if(!isLoggidIn && !isPublicRoute){
    // let callbackUrl = nextUrl.pathname
    // if(nextUrl.search) {
    //   callbackUrl += nextUrl.search
    // }

    // const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL("/auth/login", env.NEXT_PUBLIC_VERCEL_URL),
    );
  }

  return null;
  // console.log("ROUTE: ", req.nextUrl.pathname)
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};