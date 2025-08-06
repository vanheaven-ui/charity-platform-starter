import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { partnerProtect } from "../middleware/partnerMiddleware";
import * as proposalController from "../controllers/proposalController";
import { adminProtect } from "../middleware/adminMiddleware";

const router = Router();

// Partner can create a new proposal
router.post("/", protect, partnerProtect, proposalController.createProposal);

// Partner can view their own proposals
router.get(
  "/my-proposals",
  protect,
  partnerProtect,
  proposalController.getMyProposals
);

// Admin can view all proposals
router.get("/", protect, adminProtect, proposalController.getAllProposals);

export default router;
