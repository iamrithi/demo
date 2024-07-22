import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userFindById } from "./api-middleware/userAction";

export default {
  trustHost: true,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const findUser = await userFindById(credentials.user_id as string);
        return Promise.resolve(findUser);
      },
    }),
  ],
} satisfies NextAuthConfig;
