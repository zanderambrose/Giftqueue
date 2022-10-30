import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log("**********USER************: ", user);
      console.log("**********ACCOUNT************: ", account);
      console.log("**********PROFILE************: ", profile);
      console.log("**********EMAIL************: ", email);
      console.log("**********CREDENTIALS************: ", credentials);
      return true;
    },
    async session({ session, user, token }: any) {
      console.log("**********SESSION************: ", session);
      console.log("**********USER************: ", user);
      console.log("**********TOKEN************: ", token);

      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      console.log("**********TOKEN************: ", token);
      console.log("**********USER************: ", user);
      console.log("**********ACCOUNT************: ", account);
      console.log("**********PROFILE************: ", profile);
      console.log("**********ISNEWUSER************: ", isNewUser);

      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
