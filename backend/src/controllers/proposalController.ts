import { Response } from "express";
import * as proposalService from "../services/proposalService";
import { AuthRequest } from "../middleware/authMiddleware";

export const createProposal = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const partnerId = req.user?.userId;

  if (!partnerId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const proposalData = {
      title,
      description,
      partner: {
        connect: {
          id: partnerId,
        },
      },
    };

    const newProposal = await proposalService.createProposal(proposalData);
    res.status(201).json(newProposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    res.status(500).json({ error: "Failed to create proposal" });
  }
};

export const getMyProposals = async (req: AuthRequest, res: Response) => {
  const partnerId = req.user?.userId;

  if (!partnerId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const proposals = await proposalService.getProposalsByPartner(partnerId);
    res.json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({ error: "Failed to fetch proposals" });
  }
};

export const getAllProposals = async (req: AuthRequest, res: Response) => {
  try {
    const proposals = await proposalService.getAllProposals();
    res.json(proposals);
  } catch (error) {
    console.error("Error fetching all proposals:", error);
    res.status(500).json({ error: "Failed to fetch all proposals" });
  }
};
