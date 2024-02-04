"use client";
import Link from "next/link";
import Image from "next/image";
import { Lobster } from "next/font/google";
import { Poppins } from "next/font/google";
import { PersonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

const lobster = Lobster({ weight: "400", subsets: ["vietnamese"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth.user]);
  useEffect(()=>{
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <nav className='w-full flex justify-between items-center p-3 bg-gradient-to-r from-gray-900 via-slate-700 to-slate-400 sticky top-0 z-10'>
      <div className="pl-10">
        <Link href="/">
          <div className="flex justify-center items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Nexus Hub"
              width={50}
              height={50}
              className="pb-2"
            />
            <p
              className={`${lobster.className} text-white font-bold text-3xl cursor-pointer`}
            >
              Nexus Hub
            </p>
          </div>
        </Link>
      </div>
      <div className="flex justify-evenly items-center space-x-10 pr-10 text-lg">
        <Link
          href="/events/find"
          className={`${poppins.className} text-white hover:text-gray-300 transition duration-300`}
        >
          Find
        </Link>
        <Link
          href="/events/create"
          className={`${poppins.className} text-white hover:text-gray-300 transition duration-300`}
        >
          Create
        </Link>
        <Link href="/auth/sign-in">
          {isLoggedIn ? 
          <PersonIcon className="w-6 h-6 text-white hover:text-gray-300 transition duration-300" />
          : <p className={`${poppins.className} text-white hover:text-gray-300 transition duration-300`}>Sign In</p>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
