import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  roleBasedRoutes,
} from "@/routes";
import { cookies } from "next/headers";
import { checkRole } from "./action-data/checkRole";
import { STAFF_LOGIN_REDIRECT } from "./config/const";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
  const cookieStore = cookies();
  const isLoggedIn = !!req?.auth;
  const { nextUrl, auth, headers } = req!;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const roles = cookieStore.get("role")?.value.split(",");
  const token = cookieStore.get("token")?.value;

  const userRole = roles && checkRole(roles!);
  const userRoutes =
    roles &&
    roleBasedRoutes[
      userRole === "ADMIN"
        ? "ADMIN"
        : userRole === "MANAGER"
        ? "MANAGER"
        : "STAFF"
    ];
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  if (isPublicRoutes) {
    return;
  }
  if (!userRoutes?.includes(nextUrl.pathname)) {
    return Response.redirect(
      new URL(
        userRole === "STAFF" ? STAFF_LOGIN_REDIRECT : DEFAULT_LOGIN_REDIRECT,
        nextUrl
      )
    );
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
