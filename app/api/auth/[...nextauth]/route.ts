import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
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
            },
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
});

export { handler as GET, handler as POST };