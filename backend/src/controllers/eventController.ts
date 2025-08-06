import { Request, Response } from "express";
import * as eventService from "../services/eventService";
import { AuthRequest } from "../middleware/authMiddleware";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(Number(id));
    res.status(200).json(event);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedEvent = await eventService.updateEvent(Number(id), req.body);
    res.status(200).json(updatedEvent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(Number(id));
    res.status(204).send(); // 204 No Content for successful deletion
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const signUpForEvent = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { id } = req.params;
    await eventService.signUpForEvent(req.user.userId, Number(id));
    res.status(201).json({ message: "Signed up for event successfully." });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getVolunteersForEvent = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const volunteers = await eventService.getVolunteersForEvent(Number(id));
    res.status(200).json(volunteers);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};