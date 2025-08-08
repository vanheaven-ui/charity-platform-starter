import { Response } from "express";
import * as userService from "../services/userService";
import { AuthRequest } from "../middleware/authMiddleware";

export const registerUser = async (req: AuthRequest, res: Response) => {
  try {
    const newUser = await userService.registerUser({
      ...req.body,
      preferredLanguage: "en",
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userProfile = await userService.getUserById(req.user.userId);
    res.status(200).json(userProfile);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const updatedUser = await userService.updateUserProfile(
      req.user.userId,
      req.body
    );
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getSignedUpEvents = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const events = await userService.getSignedUpEvents(req.user.userId);
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const googleAuthCallback = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || typeof req.user !== "object" || !("email" in req.user)) {
      return res
        .status(401)
        .json({ message: "Google authentication failed. No user data found." });
    }
    const googleUserData = req.user as {
      email: string;
      name?: string;
    };

    if (!googleUserData?.email) {
      return res.status(400).json({ error: "Google user data is missing." });
    }

    const token = await userService.findOrCreateUserFromGoogleProfile(
      googleUserData
    );

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
