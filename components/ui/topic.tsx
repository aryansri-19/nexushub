"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface TopicProps {
  title: string;
  imgUrl: string;
  className: string;
}

const Topic: React.FC<TopicProps> = ({ title, imgUrl, className }) => {
  return (
    <div
      className={
        className
      }
    >
      <Link href={`/themes/${title.toLowerCase()}`} className="flex flex-col items-center justify-center space-y-4 hover:opacity-70">
        <Image
          src={imgUrl}
          alt={title}
          width={120}
          height={120}
          className="invert"
        />
        <p className="text-white">{title}</p>
      </Link>
      
    </div>
  );
};

export default Topic;
