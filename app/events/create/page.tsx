"use client"
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

const CreateEventPage = () => {
    const auth = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!auth.user) {
            router.push("/auth/sign-in")
        }
    }, [auth.user])
    return ( 
        <div>
            <p>Hello</p>
        </div>
     );
}
 
export default CreateEventPage;