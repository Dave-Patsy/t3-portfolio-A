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
  
  const isLoggidIn = !!req.auth

  const isApiAuthRoute = reqUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(reqUrl.pathname);
  const isAuthRoute = authRoutes.includes(reqUrl.pathname);

  if(isApiAuthRoute){
    return null
  }
  if (isAuthRoute) {
    if(isLoggidIn){
      return Response.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, reqUrl.pathname),
      );
    }
    return null
  }
  if(!isLoggidIn && !isPublicRoute){
    // let callbackUrl = nextUrl.pathname
    // if(nextUrl.search) {
    //   callbackUrl += nextUrl.search
    // }

    // const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL("/auth/login", reqUrl));
  }

  return null;
  // console.log("ROUTE: ", req.nextUrl.pathname)
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};