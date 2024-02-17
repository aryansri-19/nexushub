import NextAuth from "next-auth/next";

import { authOptions } from "@/lib/authConfig";

const { handler, auth } = NextAuth(authOptions);

export { handler as GET, handler as POST, auth }