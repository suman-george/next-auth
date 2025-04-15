// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
  }
}
