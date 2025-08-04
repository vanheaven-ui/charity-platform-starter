import { Response } from "express";
import * as projectService from "../services/projectService";
import { AuthRequest } from "../middleware/authMiddleware";

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await projectService.getProjects();
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const project = await projectService.getProjectById(Number(req.params.id));
    res.status(200).json(project);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await projectService.updateProject(Number(req.params.id), req.body);
    res.status(200).json(project);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    await projectService.deleteProject(Number(req.params.id));
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
