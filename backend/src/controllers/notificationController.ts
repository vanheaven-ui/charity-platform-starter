import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import * as notificationService from "../services/notificationService";

export const registerDeviceToken = async (req: AuthRequest, res: Response) => {
  const { token } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const updatedUser = await notificationService.registerDeviceToken(
      userId,
      token
    );
    res.json({
      message: "Device token registered successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error registering device token:", error);
    res.status(500).json({ error: "Failed to register device token" });
  }
};
