"use client";

import { useRouter } from "next/navigation";
import HandleAuth from "@/lib/handleAuth";
import { useEffect } from "react";

const CreateEventPage = () => {
    const auth = HandleAuth();
    const router = useRouter();
    useEffect(() => {
        if(!auth.success) {
            router.push('/sign-in');
        }
    })
    return ( 
        <div>
            
        </div>
     );
}
 
export default CreateEventPage;