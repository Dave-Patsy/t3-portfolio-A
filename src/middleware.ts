import authConfig from "./server/auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiUthPrefix,
  authRoutes,
  publicRoutes
} from './routes'


const {auth} = NextAuth(authConfig)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default auth( (req) => {
  const {nextUrl} = req
  const isLoggidIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiUthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if(isApiAuthRoute){
    return null
  }
  if (isAuthRoute) {
    if(isLoggidIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }
    return null
  }
  if(!isLoggidIn && !isPublicRoute){
    return Response.redirect(new URL('/auth/login',nextUrl))
  }

  return null;
  // console.log("ROUTE: ", req.nextUrl.pathname)
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};