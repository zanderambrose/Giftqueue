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
        },
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      // console.log("**********USER************: ", user);
      // console.log("**********ACCOUNT************: ", account);
      // console.log("**********PROFILE************: ", profile);
      // console.log("**********EMAIL************: ", email);
      // console.log("**********CREDENTIALS************: ", credentials);
      return true;
    },
    async session({ session, user, token }: any) {
      // console.log("**********SESSION************: ", session);
      // console.log("**********USER************: ", user);
      // console.log("**********TOKEN************: ", token);

      // Send properties to the client, like an access_token from a provider.
      session.idToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      // console.log("**********TOKEN************: ", token);
      // console.log("**********USER************: ", user);
      // console.log("**********ACCOUNT************: ", account);
      // console.log("**********PROFILE************: ", profile);
      // console.log("**********ISNEWUSER************: ", isNewUser);
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.id_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      // Access token has expired, try to update it
      return refreshAccessToken(token);
      // if (account) {
      //   token.accessToken = account.id_token;
      // }
      // return token;
    },
  },
});
