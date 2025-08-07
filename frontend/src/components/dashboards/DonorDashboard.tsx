// components/dashboards/DonorDashboard.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyDonations } from "@/lib/api"; // Use alias
import { format } from "date-fns";

interface Donation {
  id: number;
  amount: number;
  message?: string;
  createdAt: string;
  project: {
    name: string;
  };
}

interface DonorDashboardProps {
  user: any; // User object from AuthContext
}

export default function DonorDashboard({ user }: DonorDashboardProps) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getMyDonations(token);
          setDonations(data);
        }
      } catch (err: any) {
        setError(
          err.response?.data?.error || "Failed to fetch your donations."
        );
        console.error("Failed to fetch donations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600 text-lg">Loading donor dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Donations</h2>

      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {donations.length === 0 ? (
        <p className="text-gray-600 text-lg text-center py-10">
          You haven&lsquo;t made any donations yet.{" "}
          <Link href="/projects" className="text-blue-600 hover:underline">
            Explore projects
          </Link>{" "}
          to make your first contribution!
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {donation.project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${donation.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {donation.message || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(donation.createdAt), "MMM d, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/profile"
          className="block p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <h4 className="text-xl font-semibold text-blue-800 mb-2">
            Edit Profile
          </h4>
          <p className="text-gray-700 text-sm">
            Update your personal information and password.
          </p>
        </Link>
        <Link
          href="/projects"
          className="block p-6 bg-green-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <h4 className="text-xl font-semibold text-green-800 mb-2">
            Explore More Projects
          </h4>
          <p className="text-gray-700 text-sm">
            Find new causes to support and make a difference.
          </p>
        </Link>
      </div>
    </div>
  );
}
