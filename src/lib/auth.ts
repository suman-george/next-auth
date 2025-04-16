import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOption: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    {
      id: "uaepass",
      name: "UAE Pass",
      type: "oauth",
      idToken: false,
      clientId: process.env.UAEPASS_CLIENT_ID,
      clientSecret: process.env.UAEPASS_CLIENT_SECRET,
      authorization: {
        url: `${process.env.UAEPASS_BASE_URL}/idshub/authorize`,
        params: {
          response_type: "code",
          state: "HnlHOJTkTb66Y5H",
          client_id: process.env.UAEPASS_CLIENT_ID,
          scope: process.env.UAEPASS_SCOPES,
          redirect_uri: process.env.UAEPASS_REDIRECT_URI,
          acr_values: process.env.UAEPASS_ACR_VALUES,
        },
      },
      userinfo: `${process.env.UAEPASS_BASE_URL}/idshub/userinfo`,
      token: `${process.env.UAEPASS_BASE_URL}/idshub/token`,
      profile: async (profile, token) => {
        const { ...profiledata } = profile;
        console.log("UAE PASS profile:", profile);
        console.log("UAE PASS token:", token);
        return {
          ...profiledata,
          access_token: token.access_token,
          id: profile.uuid,
          uuid: profile.uuid,
          name:
            `${profile.firstnameEN ?? ""} ${profile.lastnameEN ?? ""}`.trim() ||
            "UAE Pass User",
        };
      },
    },
  ],
  session: { strategy: "jwt" },
  callbacks: {
    signIn() {
      return true;
    },
    jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
