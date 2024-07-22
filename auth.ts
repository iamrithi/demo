import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { cookies } from "next/headers";
import { checkRole } from "./action-data/checkRole";
import jwt from "jsonwebtoken";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async signOut() {
      cookies().delete("role");
    },
  },
  callbacks: {
    async session({ token, session, user }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token?.role) {
        session.user.role = token.role;
      }
      if (session.user && token?.token) {
        session.user.token = token.token;
      }
      return session;
    },
    async jwt({ token, user, profile }) {
      const newUser = user as any;
      if (!token.sub) return token;
      if (!newUser) return token;

      token.role = newUser?.role;
      cookies().set("role", newUser?.role);
      const prioritizeRole = checkRole(newUser?.role);
      const payLoad = {
        user_id: "",
        user_role: "",
        canteen_id: "",
      };
      if (prioritizeRole === "ADMIN") {
        payLoad.user_id = newUser?.id;
        payLoad.user_role = "ADMIN";
      }
      if (prioritizeRole === "MANAGER") {
        payLoad.user_id = newUser?.id;
        payLoad.user_role = "MANAGER";
        payLoad.canteen_id = newUser?.manage_canteen.id;
      }
      if (prioritizeRole === "STAFF") {
        payLoad.user_id = newUser?.id;
        payLoad.user_role = "STAFF";
        payLoad.canteen_id = newUser?.canteen.id;
      }
      const secret = process.env.NEXTAUTH_SECRET;
      const bearerToken = jwt.sign(payLoad, `${secret}`, {
        expiresIn: 5 * 24 * 60 * 60 * 1000, // 5 days
      });
      token.token = bearerToken;
      console.log(bearerToken);
      cookies().set("token", bearerToken);
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
  },
  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
});
