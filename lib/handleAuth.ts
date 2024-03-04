'use client'
import useAuth from "@/hooks/useAuth";
import { useSession } from "next-auth/react";

export default function handleAuth() {
    const customAuth = useAuth();
    const { data: session } = useSession();
  
    if (!session && !customAuth.user) {
      return { success: false };
    }
  
    return { success: true, customAuth: customAuth!.user, sessionAuth: session?.user };
}
