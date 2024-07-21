"use server"

import { prisma } from "@/lib/prisma";

type Form = {
    title?: string,
    location?: string,
    eventDate?: Date,
    tags?: Tag[],
    capacity?: number,
}
export const fetchEvents = async (formData: Form) => {
    const {title, eventDate, location, tags, capacity} = formData;
    try {
        const events = await prisma.event.findMany({
            where: {
                title,
                startDate: eventDate,
                location,
                tags: {
                    some: {
                        name: {
                            in: tags?.map(tag => tag.name),
                        },
                    },
                },
            }
        });
        return events;
    }
    catch (error) {
        console.error("Error fetching events:");
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
