import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_PROVIDER_CLIENTID as string,
            clientSecret: process.env.GITHUB_PROVIDER_CLIENT_SCERET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_PROVIDER_CLIENTID as string,
            clientSecret: process.env.GOOGLE_PROVIDER_CLIENT_SCERET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        })
    ]
}

export default NextAuth(authOptions)