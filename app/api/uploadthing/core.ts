'use client';
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import HandleAuth from "@/lib/handleAuth";
 
const f = createUploadthing();

const handleAuth = () => {
    const auth = HandleAuth();
    if (!auth.success) throw new UploadThingError("Unauthorized");
    return { userId: auth?.customAuth?.id || auth.sessionAuth?.name };
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