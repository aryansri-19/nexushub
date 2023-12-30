"use client";
import Link from "next/link";
import Image from "next/image";
import { Lobster } from "next/font/google";
import { Poppins } from "next/font/google";
import { PersonIcon } from "@radix-ui/react-icons";

const lobster = Lobster({ weight:"400", subsets: ['vietnamese'] })
const poppins = Poppins({ weight:"400", subsets: ['latin'] })

const Navbar = () => {
    
    return (
        <nav className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-900 via-slate-700 to-slate-400">
            <div className="pl-10">
                <Link href="/">
                    <div className="flex justify-center items-center space-x-2">
                        <Image src="/logo.png" alt="Nexus Hub" width={50} height={50} className="pb-2"/>
                        <p className={`${lobster.className} text-white font-bold text-3xl cursor-pointer`}>Nexus Hub</p>
                    </div>
                </Link>
            </div>
            <div className="flex justify-evenly items-center space-x-10 pr-10 text-lg">
                <Link href="/find" className={`${poppins.className} text-white hover:text-gray-300 transition duration-300`}>Find</Link>
                <Link href="/create" className={`${poppins.className} text-white hover:text-gray-300 transition duration-300`}>Create</Link>
                <Link href="/sign-up">
                    <PersonIcon className="w-6 h-6 text-white hover:text-gray-300 transition duration-300" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;