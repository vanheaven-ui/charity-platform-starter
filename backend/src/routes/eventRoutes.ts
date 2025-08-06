// backend/routes/eventRoutes.js
import { Router } from "express";
import * as eventController from "../controllers/eventController";
import { protect } from "../middleware/authMiddleware";
import { adminProtect } from "../middleware/adminMiddleware";

const router = Router();

// Public routes
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

// Protected routes (requires user to be logged in)
router.post("/:id/signup", protect, eventController.signUpForEvent);

// Admin routes (requires user to be logged in AND have 'Admin' role)
router.post("/", protect, adminProtect, eventController.createEvent); 
router.put("/:id", protect, adminProtect, eventController.updateEvent);
router.delete("/:id", protect, adminProtect, eventController.deleteEvent);
router.get(
  "/:id/volunteers",
  protect,
  adminProtect,
  eventController.getVolunteersForEvent
);

export default router;