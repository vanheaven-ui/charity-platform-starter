import { Router } from "express";
import * as userController from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Standard email/password routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Google OAuth routes
// This route would initiate the Google authentication process.
router.get("/google", (req, res) => {
  // In a full implementation, you would redirect the user to Google's sign-in page here.
  // This is often handled by a library like Passport.js.
  res.send("Redirecting to Google for authentication...");
});

// This is the callback route where Google will send the user back after successful login.
router.get("/google/callback", userController.googleAuthCallback);

// Protected routes using the protect middleware
router.get("/profile", protect, userController.getProfile);
router.put("/profile", protect, userController.updateProfile);
router.get("/signed-up-events", protect, userController.getSignedUpEvents);

export default router;
