import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_PROVIDER_CLIENTID as string,
            clientSecret: process.env.GITHUB_PROVIDER_CLIENT_SECRET as string,
            profile(profile) {
                return {
                    id: profile.email,
                    email: profile.email,
                    image: profile.avatar_url,
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_PROVIDER_CLIENTID as string,
            clientSecret: process.env.GOOGLE_PROVIDER_CLIENT_SECRET as string,
            profile(profile) {
                return {
                    id: profile.email,
                    email: profile.email,
                    image: profile.picture,
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
}