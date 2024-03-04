import Link from "next/link";
import Image from "next/image";
import { Lobster } from "next/font/google";
import { Poppins } from "next/font/google";
import Profile from "./Profile";

const lobster = Lobster({ weight: "400", subsets: ["vietnamese"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
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
        <Link href="/sign-in">
          <Profile poppins={poppins}/>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
