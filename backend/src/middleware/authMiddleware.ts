import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

// I am extending the Request object to include the user payload
export interface AuthRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Not authorized, no token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!jwtSecret) {
    return res.status(500).json({
      error: "JWT secret is not defined",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      userId: number;
      role: string;
    };
    req.user = decoded; // Attach user id and role as payload to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};
