"use client";
import { Poppins } from "next/font/google";
import Topic from "./ui/topic";
import Image from "next/image";
import { Button } from "./ui/button";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });
const Content = () => {
  const topics = [
    { title: "Music", imgUrl: "/images/music.png" },
    { title: "Visual Arts", imgUrl: "/images/visual-arts.png" },
    { title: "Pets", imgUrl: "/images/pets.png" },
    { title: "Nightlife", imgUrl: "/images/nightlife.png" },
  ];
  return (
    <div className="flex justify-between items-center p-10 bg-gradient-to-r from-gray-900 via-slate-700 to-slate-400 max-w-full">
      <div className="w-1/2 pl-12 relative">
        <Image src="/images/contentPic.jpg" width={600} height={600} alt="Content Pic" className="rounded-xl"/>
        <div className="absolute z-50 left-[8vw] top-[17vh] flex justify-between items-center gap-44 p-5">
          <Button className="">Find Events</Button>
          <Button className="">Create Events</Button>
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
