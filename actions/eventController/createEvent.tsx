"use server";
import { prisma } from "@/lib/prisma";

type Form = {
  userId: number;
  title: string;
  description: string;
  startDate: Date;
  startTime: string;
  endDate?: Date;
  endTime?: string;
  locationType: string;
  location?: string;
  onlineLink?: string;
  banner?: string;
  tags?: Tag[];
  isFree: boolean;
  price?: number;
  capacity?: number;
};

export const createEvent = async (formData: Form) => {
  const {
    userId,
    title,
    description,
    startDate,
    startTime,
    endDate,
    endTime,
    locationType,
    location,
    onlineLink,
    banner,
    tags,
    isFree,
    price = 0,
    capacity = null,
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
        userId,
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
        locationType,
        location,
        onlineLink,
        banner,
        tags: {
          create: tags?.map((tag) => ({
            name: tag.name,
            description: tag.description,
          })),
        },
        isFree,
        price,
        capacity,
      },
    });
    return newEvent;
  } catch (error) {
    console.error("Error creating event:");
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
