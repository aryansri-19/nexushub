'use client';
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
import HandleAuth from "@/lib/handleAuth";

interface ProfileProps {
  poppins: any
}

const Profile = (props: ProfileProps) => {
  const res = HandleAuth();
  const { success, sessionAuth } = res;
  return (
    <>
    { !success ? <p className={`${props.poppins.className} text-white hover:text-gray-300 transition duration-300`}>Sign In</p>
    :
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {sessionAuth ? 
        <Image src={sessionAuth!.image as string} alt="Profile" width={40} height={40} className="rounded-full" />
        :
        <PersonIcon className="w-6 h-6 text-white hover:text-gray-300 transition duration-300" /> }
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="focus:bg-gray-300">
          <Link href="/profile">Your Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">
          <Link href="/sign-out">Sign out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        }
    </>
  );
};

export default Profile;
