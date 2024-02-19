'use client';
import { SessionProvider } from "next-auth/react";

interface NextProviderProps {
    children: React.ReactNode;
}

export const NextProvider = (props: NextProviderProps) => {
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    );
}