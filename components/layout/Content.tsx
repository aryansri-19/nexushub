"use client";
import { Poppins } from "next/font/google";
import Topic from "../ui/topic";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { tags } from "@/lib/constants/tags";
import { useEffect, useState } from "react";
import CarouselLayout from "./CarouselLayout";

const poppins = Poppins({ weight: "700", subsets: ["latin"] });
const Content = () => {

  const [randomTags, setRandomTags] = useState<{ title: string; imgUrl: string }[]>([]);

  useEffect(() => {
    const shuffledTags = [...tags];
    shuffledTags.sort(() => Math.random() - 0.5);
    setRandomTags(shuffledTags.slice(0, 4));
  }, []);

  const router = useRouter();
  return (
    <>
    <div className="flex justify-between items-center p-10 bg-gradient-to-r from-gray-900 via-slate-700 to-slate-400 max-w-full">
      <div className="w-1/2">
        <div className=" flex justify-around items-center p-5 mt-10 pl-10">
          <Button size="lg" className="bg-gray-500" onClick={()=>router.push('/events/find')}>Find Events</Button>
          <Button size="lg" className="bg-gray-500" onClick={()=>router.push('/events/create')}>Create Events</Button>
        </div>
      </div>
      <div className="flex items-center flex-col pl-10 w-2/3">
        <div className={`${poppins.className} font-bold text-xl text-white`}>
          THEMES YOU MIGHT LIKE
        </div>
        <div className="flex flex-wrap justify-center items-center pt-7 gap-12">
          {randomTags.map((topic) => (
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
    <CarouselLayout/>
    </>
  );
};

export default Content;
