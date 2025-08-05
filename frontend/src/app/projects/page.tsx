"use client";
import { useState, useEffect } from "react";
import { getProjects } from "../../lib/api";
import { useAuth } from "@/context/AuthContext";

interface Project {
  id: number;
  name: string;
  description: string;
  goal: number;
  raised: number;
}

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Our Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="text-sm text-gray-500">
                  <p>Goal: ${project.goal.toLocaleString()}</p>
                  <p>Raised: ${project.raised.toLocaleString()}</p>
                </div>
                {user && (
                  <button
                    onClick={() => alert(`Donate to project: ${project.name}`)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Donate
                  </button>
                )}
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
