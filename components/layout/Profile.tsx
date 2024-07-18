"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HandleAuth from "@/lib/handleAuth";
import { signOut } from "next-auth/react";

interface ProfileProps {
  poppins: any;
}

const Profile = (props: ProfileProps) => {
  const router = useRouter();
  const { success, sessionAuth, customAuth } = HandleAuth();
  const handleSignOut = () => {
    if (sessionAuth) {
      signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } else {
      customAuth?.setUser(null);
      localStorage.removeItem("user");
      router.push("/");
    }
  };
  return (
    <>
      {!success ? (
        <p
          className={`${props.poppins.className} text-white hover:text-gray-300 transition duration-300`}
        >
          Sign In
        </p>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {sessionAuth ? (
              <Image
                src={sessionAuth!.image as string}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <PersonIcon className="w-6 h-6 text-white hover:text-gray-300 transition duration-300" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="focus:bg-gray-300">
              <Link href="/profile">Your Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <div onClick={handleSignOut} className="cursor-pointer">
                Sign out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default Profile;
