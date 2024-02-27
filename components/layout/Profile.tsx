import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import Image from "next/image";

interface SessionProps {
  session: Session | null;
}

const Profile = ({ session }: SessionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session ? 
        <Image src={session.user!.image as string} alt="Profile" width={40} height={40} className="rounded-full" />
        :
        <PersonIcon className="w-6 h-6 text-white hover:text-gray-300 transition duration-300" /> }
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="focus:bg-gray-300">
          <Link href="/profile">Your Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">
          <Link href="/auth/sign-out">Sign out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
