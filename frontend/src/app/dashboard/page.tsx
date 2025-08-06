// app/dashboard/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Use alias

// Import the new dashboard components
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import DonorDashboard from "@/components/dashboards/DonorDashboard";
import BeneficiaryDashboard from "@/components/dashboards/BeneficiaryDashboard";
import VolunteerDashboard from "@/components/dashboards/VolunteerDashboard";
import Link from "next/link";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16 bg-gray-50">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16 bg-gray-50">
        <p className="text-gray-600 text-lg">Redirecting to login...</p>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case "Admin":
        return <AdminDashboard user={user} />;
      case "Donor":
        return <DonorDashboard user={user} />;
      case "Beneficiary":
        return <BeneficiaryDashboard user={user} />;
      case "Volunteer":
        return <VolunteerDashboard user={user} />;
      default:
        return (
          <div className="p-8 bg-gray-50 rounded-xl shadow-md border border-gray-100 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome, {user.name}!
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              This is your general dashboard. Content tailored to your role will
              appear here soon.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
              <Link
                href="/profile"
                className="block p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <h4 className="text-xl font-semibold text-blue-800 mb-2">
                  Edit Profile
                </h4>
                <p className="text-gray-700 text-sm">
                  Update your personal information.
                </p>
              </Link>
              <Link
                href="/projects"
                className="block p-6 bg-green-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <h4 className="text-xl font-semibold text-green-800 mb-2">
                  Explore Projects
                </h4>
                <p className="text-gray-700 text-sm">
                  Find new causes to support.
                </p>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-100">
      <div className="container mx-auto py-12 px-4">{renderDashboard()}</div>
    </div>
  );
}
