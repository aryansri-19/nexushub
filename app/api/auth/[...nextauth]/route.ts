import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { addUser, verifyUser } from "@/actions/authController/authFunctions";

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
        try {
          const user = await verifyUser({ email: session.user.email! });
          if (user.user) {
            session.user.image = user.user?.image;
            session.user.name = user.user?.name;
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      return session;
    },
    async signIn({ user }) {
      if (user) {
        try {
          const result = await addUser({
            name: user.name!,
            email: user.email!,
            image: user.image!,
          });
          if (result.error) {
            throw new Error(result.error);
          }
          localStorage.setItem("user", JSON.stringify(result));
          return true;
        } catch (error) {
          console.error("Error adding user:", error);
          return false;
        }
      }
      return false;
    },
  },
});

export { handler as GET, handler as POST };
