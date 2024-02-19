import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";


const Profile = (
) => {
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <PersonIcon className="w-6 h-6 text-white hover:text-gray-300 transition duration-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href='/profile'>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link href='/auth/sign-out'>Sign out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
     );
}
 
export default Profile;