import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import * as notificationController from "../controllers/notificationController";

const router = Router();

// Endpoint for authenticated users to register their device token
router.post(
  "/register-device",
  protect,
  notificationController.registerDeviceToken
);

export default router;
