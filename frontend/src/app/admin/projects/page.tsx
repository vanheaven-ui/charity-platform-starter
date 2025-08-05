"use client";
import { useEffect, useState } from "react";
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
  const [pageLoading, setPageLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goal: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== "Admin")) {
      // Redirect non-admin users to the home page
      router.push("/");
    } else if (user && user.role === "Admin") {
      fetchProjects();
    }
  }, [user, loading, router]);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
      setPageLoading(false);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setPageLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "goal" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        if (isEditing && currentProjectId) {
          await updateProject(currentProjectId, formData, token);
          alert("Project updated successfully!");
        } else {
          await createProject(formData, token);
          alert("Project created successfully!");
        }
        setFormData({ name: "", description: "", goal: 0 });
        setIsEditing(false);
        setCurrentProjectId(null);
        fetchProjects(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Failed to save project. Please try again.");
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
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await deleteProject(projectId, token);
          alert("Project deleted successfully!");
          fetchProjects(); // Refresh the list
        }
      } catch (error) {
        console.error("Failed to delete project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  if (pageLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not an admin
  if (!user || user.role !== "Admin") {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>

        {/* Project Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-6 border rounded-lg bg-blue-50"
        >
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? "Edit Project" : "Create New Project"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Goal ($)</label>
              <input
                type="number"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                min="0"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {isEditing ? "Save Changes" : "Create Project"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentProjectId(null);
                  setFormData({ name: "", description: "", goal: 0 });
                }}
                className="ml-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-blue-50 p-6 rounded-lg shadow-sm"
              >
                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="text-sm text-gray-500">
                  <p>Goal: ${project.goal.toLocaleString()}</p>
                  <p>Raised: ${project.raised.toLocaleString()}</p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
