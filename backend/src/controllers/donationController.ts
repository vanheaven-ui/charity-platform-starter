import { Response } from "express";
import * as donationService from "../services/donationService";
import { AuthRequest } from "../middleware/authMiddleware";

export const createDonation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { amount, message, projectId } = req.body;
    const donation = await donationService.createDonation(
      { amount, message },
      req.user.userId,
      projectId
    );
    res.status(201).json(donation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getDonations = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const donations = await donationService.getDonations(req.user.userId);
    res.status(200).json(donations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
