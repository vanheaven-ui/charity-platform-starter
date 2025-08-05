import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// Route to get donation data for charts
router.get(
  "/donations-by-project",
  protect,
  dashboardController.getDonationsByProject
);
router.get(
  "/monthly-donations",
  protect,
  dashboardController.getMonthlyDonations
);

export default router;
