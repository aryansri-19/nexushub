import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import useAuth from "./hooks/useAuth";

export default async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;

    const publicRoutes = ["/", "/themes/*", "/auth/sign-in", "/auth/sign-up", "/auth/sign-out", "/events/find", "/events/create"];
    if(publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    const requestForNextAuth = {
        headers: {
            cookie: request.headers.get('cookie') ?? undefined
        }
    }

    const session = await getSession({ req: requestForNextAuth });
    if(session) {
        return NextResponse.next();
    }

    // const isCustomAuth = useAuth();
    // if(isCustomAuth.user) {
    //     return NextResponse.next();
    // }

    return NextResponse.redirect(url.origin+"/auth/sign-in");
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
  }