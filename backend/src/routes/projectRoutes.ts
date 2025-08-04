import { Router} from "express";
import * as projectController from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";   

const router = Router();

// Public routes (e.g., for viewing projects)
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById); 

// Protected routes (for creating, updating, and deleting projects)
router.post("/", protect, projectController.createProject);
router.put("/:id", protect, projectController.updateProject); 
router.delete("/:id", protect, projectController.deleteProject); 

export default router;
