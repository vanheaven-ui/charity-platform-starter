"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-6">
          This is your personal dashboard. Here you can manage your account and
          view your activities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/my-donations"
            className="block p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-800">
              My Donations
            </h2>
            <p className="text-gray-700 mt-2">
              View a history of all your past contributions.
            </p>
          </Link>
          <Link
            href="/profile"
            className="block p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-800">
              Edit Profile
            </h2>
            <p className="text-gray-700 mt-2">
              Update your personal information and password.
            </p>
          </Link>
          {user.role === "Admin" && (
            <Link
              href="/admin/projects"
              className="block p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-800">
                Manage Projects
              </h2>
              <p className="text-gray-700 mt-2">
                Create, update, or delete charity projects.
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
