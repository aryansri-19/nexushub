'use client';
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { useSession } from "next-auth/react";
import useAuth from "@/hooks/useAuth";
 
const f = createUploadthing();

const handleAuth = () => {
    const customAuth = useAuth();
    const { data: session } = useSession();
    if (!customAuth.user && !session) throw new UploadThingError("Unauthorized");
    return { userId: customAuth.user?.id || session?.user!.name };
}
 
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 }})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;