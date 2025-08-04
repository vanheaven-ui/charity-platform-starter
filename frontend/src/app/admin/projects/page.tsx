"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../../lib/api";

interface Project {
  id: number;
  name: string;
  description: string;
  goal: number;
  raised: number;
}

export default function AdminProjects() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goal: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (user) {
      fetchProjects();
    }
  }, [user, loading, router]);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (isEditing && currentProjectId !== null) {
        await updateProject(
          currentProjectId,
          formData,
          localStorage.getItem("token")!
        );
        console.log("Project updated successfully");
      } else {
        await createProject(formData, localStorage.getItem("token")!);
        console.log("Project created successfully");
      }
      setFormData({ name: "", description: "", goal: 0 });
      setIsEditing(false);
      setCurrentProjectId(null);
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      name: project.name,
      description: project.description,
      goal: project.goal,
    });
    setIsEditing(true);
    setCurrentProjectId(project.id);
  };

  const handleDelete = async (projectId: number) => {
    if (
      !user ||
      !window.confirm("Are you sure you want to delete this project?")
    )
      return;
    try {
      await deleteProject(projectId, localStorage.getItem("token")!);
      console.log("Project deleted successfully");
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Project" : "Create New Project"}
          </h2>
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Project Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <textarea
              placeholder="Project Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md"
              rows={3}
              required
            />
            <input
              type="number"
              placeholder="Funding Goal"
              value={formData.goal}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  goal: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-2 border rounded-md"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {isEditing ? "Update Project" : "Create Project"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: "", description: "", goal: 0 });
                  setIsEditing(false);
                  setCurrentProjectId(null);
                }}
                className="ml-4 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Existing Projects</h2>
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 text-sm text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
