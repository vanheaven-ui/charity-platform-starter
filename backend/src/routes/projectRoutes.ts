import { Router} from "express";
import * as projectController from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";   
import { adminProtect } from "../middleware/adminMiddleware";

const router = Router();

// Public routes (e.g., for viewing projects)
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById); 

// Protected routes (for creating, updating, and deleting projects)
router.post("/", protect, adminProtect, projectController.createProject);
router.put("/:id", protect, adminProtect, projectController.updateProject); 
router.delete("/:id", protect, adminProtect, projectController.deleteProject); 

export default router;
