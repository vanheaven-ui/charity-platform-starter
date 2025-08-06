import { PrismaClient, Prisma } from "@prisma/client";
import type { Event, EventSignup } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new event
export const createEvent = async (
  eventData: Prisma.EventCreateInput
): Promise<Event> => {
  return prisma.event.create({
    data: {
      title: eventData.title,
      description: eventData.description,
      locationName: eventData.locationName,
      locationLat: eventData.locationLat as number,
      locationLng: eventData.locationLng as number,
      eventDate: new Date(eventData.eventDate as string),
      isActive: eventData.isActive ?? true,
    },
  });
};

// Get all events with optional search
export const getAllEvents = async (search?: string): Promise<Event[]> => {
  const where: Prisma.EventWhereInput = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { locationName: { contains: search, mode: "insensitive" } },
    ];
  }

  return prisma.event.findMany({
    where,
    orderBy: {
      eventDate: "asc",
    },
  });
};

// Get a single event by ID
export const getEventById = async (id: number): Promise<Event> => {
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
};

// Update an existing event
export const updateEvent = async (
  id: number,
  updateData: Prisma.EventUpdateInput
): Promise<Event> => {
  if (updateData.eventDate && typeof updateData.eventDate === "string") {
    updateData.eventDate = new Date(updateData.eventDate);
  }
  if (updateData.locationLat && typeof updateData.locationLat === "string") {
    updateData.locationLat = parseFloat(updateData.locationLat);
  }
  if (updateData.locationLng && typeof updateData.locationLng === "string") {
    updateData.locationLng = parseFloat(updateData.locationLng);
  }

  const event = await prisma.event.update({
    where: { id },
    data: updateData,
  });
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
};

// Delete an event
export const deleteEvent = async (id: number): Promise<Event> => {
  const event = await prisma.event.delete({ where: { id } });
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
};

// Sign up a user for an event
export const signUpForEvent = async (
  userId: number,
  eventId: number
): Promise<EventSignup> => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!event) {
      throw new Error("Event not found.");
    }
    return await prisma.eventSignup.create({
      data: {
        userId: userId,
        eventId: eventId,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("You have already signed up for this event.");
    }
    throw error;
  }
};

// Get all volunteers for a specific event
export const getVolunteersForEvent = async (
  eventId: number
): Promise<any[]> => {
  return prisma.eventSignup.findMany({
    where: { eventId: eventId },
    select: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};
