'use client';
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOut = () => {
    return ( 
        <Button onClick={() => signOut({
            callbackUrl: '/',
            redirect: true
        })}>Sign out</Button>
     );
}
 
export default SignOut;