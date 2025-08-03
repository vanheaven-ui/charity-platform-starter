import { Request, Response } from "express";
import * as userService from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
}
