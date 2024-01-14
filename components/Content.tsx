"use client";
import { Poppins } from "next/font/google";
import Topic from "./ui/topic";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });
const Content = () => {
  const router = useRouter();
  const topics = [
    { title: "Music", imgUrl: "/images/music.png" },
    { title: "Visual Arts", imgUrl: "/images/visual-arts.png" },
    { title: "Pets", imgUrl: "/images/pets.png" },
    { title: "Nightlife", imgUrl: "/images/nightlife.png" },
  ];
  return (
    <div className="flex justify-between items-center p-10 bg-gradient-to-r from-gray-900 via-slate-700 to-slate-400 max-w-full">
      <div className="w-1/2">
        <div className=" flex justify-evenly items-center p-5">
          <Button size="lg" className="" onClick={()=>router.push('/events/find')}>Find Events</Button>
          <Button size="lg" className="" onClick={()=>router.push('/events/create')}>Create Events</Button>
        </div>
      </div>
      <div className="flex items-center flex-col pl-10">
        <div className={`${poppins.className} font-bold text-xl text-white`}>
          THEMES YOU MIGHT LIKE
        </div>
        <div className="flex flex-wrap justify-center items-center pt-7 gap-5">
          {topics.map((topic) => (
            <Topic
              title={topic.title}
              imgUrl={topic.imgUrl}
              className={`mx-4 ${poppins.className}`}
              key={topic.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
