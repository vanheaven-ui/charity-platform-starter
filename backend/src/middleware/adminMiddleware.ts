import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const adminProtect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ error: "Not authorized as an admin" });
  }
};
