import { addUser, verifyUser } from "@/actions/authController/authFunctions";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_PROVIDER_CLIENTID as string,
      clientSecret: process.env.GITHUB_PROVIDER_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_PROVIDER_CLIENTID as string,
      clientSecret: process.env.GOOGLE_PROVIDER_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async session({ session }) {
      if (session.user) {
        const user = await verifyUser({ email: session.user.email! });
        session.user.image = user.user?.image;
        session.user.name = user.user?.name;
      }
      return session;
    },
    async signIn({ user }) {
      if (user) {
        await addUser({
          name: user.name!,
          email: user.email!,
          image: user.image!,
        });
        return true;
      }
      return false;
    },
  },
});

export { handler as GET, handler as POST };
