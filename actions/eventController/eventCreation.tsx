"use server";
import { prisma } from "@/lib/prisma";

type Form = {
  title: string;
  description: string;
  eventDate: Date;
  userId: number;
  location: string;
  startTime: Date;
  endTime: Date;
  tags: Tag[];
  imgUrl: string;
};

export const createEvent = async (formData: Form) => {
  const {
    title,
    description,
    eventDate,
    userId,
    location,
    startTime,
    endTime,
    tags,
    imgUrl,
  } = formData;
  try {
    const organizer = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!organizer) {
        console.log("User doesn't exist", organizer);
        throw new Error("Organizer not registered");
    }
    const newEvent = await prisma.event.create({
        data: {
            title: title as string,
            description: description as string,
            eventDate: new Date(eventDate),
            organizer: {
                connect: {
                    id: organizer.id,
                },
            },
            location: location as string,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            tags: {
                create: tags.map((tag: Tag) => ({
                    name: tag.name,
                    description: tag.description,
                })),
            },
            imgUrl: imgUrl as string
        }
    });
    return newEvent;
  }
  catch (error) {
    console.error("Error creating event:");
    throw error
  } finally {
    await prisma.$disconnect();
  }
};
