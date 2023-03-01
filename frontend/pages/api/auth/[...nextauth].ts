import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { refreshAccessToken } from "../../../util/googleRefresh";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/contacts.readonly",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log("user: ", user);
      console.log("account: ", account);
      console.log("profile: ", profile);
      console.log("email: ", email);
      return true;
    },
    async session({ session, user, token }: any) {
      console.log("SESSION CALLBACK");
      console.log("Id Token: ", token.accessToken as string);
      session.accessToken = token.accessToken as string;
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      console.log("JWT CALLBACK");
      if (account) {
        token.accessToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.expires = (account.expires_at as number) * 1000;
        token.user = user;
        token.google_auth = account.access_token;
      }
      if (Date.now() < token.expires) {
        return token;
      }
      return refreshAccessToken(token);
    },
  },
});
