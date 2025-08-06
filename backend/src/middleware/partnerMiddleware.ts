import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const partnerProtect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "Partner") {
    next();
  } else {
    res.status(403).json({ error: "Not authorized as a partner" });
  }
};
