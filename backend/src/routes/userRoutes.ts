import { Router } from "express";
import * as userController from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Protected route to use the protect middleware
router.get("/profile", protect, userController.getProfile);
router.put("/profile", protect, userController.updateProfile);

router.get("/signed-up-events", protect, userController.getSignedUpEvents);

export default router;
