"use server"

import { prisma } from "@/lib/prisma";

export const fetchEvents = async (formData: any) => {
    const {title, userId, eventDate, location, tags} = formData;
    try {
        const events = await prisma.event.findMany({
            where: {
                title: title ? title : "",
                eventDate: eventDate ? new Date(eventDate) : undefined,
                location: location ? location : "",
                tags: {
                    some: {
                        name: tags.map((tag: any) => tag.name)
                    }
                },
                organizer: userId ? {
                    id: userId
                } : undefined
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
