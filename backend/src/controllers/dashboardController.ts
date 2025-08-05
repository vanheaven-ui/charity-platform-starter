import { Response } from 'express';
import * as dashboardService from '../services/dashboardService';
import { AuthRequest } from '../middleware/authMiddleware';

export const getDonationsByProject = async (req: AuthRequest, res: Response) => {
  try {
    const data = await dashboardService.getDonationsByProject();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch dashboard data.' });
  }
};