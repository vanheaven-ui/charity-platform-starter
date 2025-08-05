import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createProject = async (projectData: Prisma.ProjectCreateInput) => {
  return prisma.project.create({ data: projectData });
};

export const getProjects = async (search?: string) => {
  const where: Prisma.ProjectWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  return prisma.project.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProjectById = async (id: number) => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    throw new Error("Project not found");
  }
  return project;
};

export const updateProject = async (
  id: number,
  projectData: Prisma.ProjectUpdateInput
) => {
  const project = await prisma.project.update({
    where: { id },
    data: projectData,
  });
  if (!project) {
    throw new Error("Project not found");
  }
  return project;
};

export const deleteProject = async (id: number) => {
  const project = await prisma.project.delete({ where: { id } });
  if (!project) {
    throw new Error("Project not found");
  }
  return project;
};
