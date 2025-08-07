"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { getMyDonations } from "@/lib/api";

interface Donation {
  id: number;
  amount: number;
  message?: string;
  createdAt: string;
  project: {
    name: string;
  };
}

export default function MyDonations() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!loading && user) {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const data = await getMyDonations(token);
            setDonations(data);
          }
        } catch (error) {
          console.error("Failed to fetch donations:", error);
        } finally {
          setPageLoading(false);
        }
      } else if (!loading && !user) {
        router.push("/login");
      }
    };

    fetchDonations();
  }, [user, loading, router]);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading donations...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="pt-16">
      <div className="min-h-screen p-8">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">My Donations</h1>
          {donations.length > 0 ? (
            <ul className="space-y-4">
              {donations.map((donation) => (
                <li
                  key={donation.id}
                  className="bg-blue-50 p-6 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-lg">
                    Donated ${donation.amount.toLocaleString()} to &quot;
                    {donation.project.name}&quot;
                  </p>
                  {donation.message && (
                    <p className="text-gray-700 mt-2">
                      Message: {donation.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    On: {new Date(donation.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              You have not made any donations yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
