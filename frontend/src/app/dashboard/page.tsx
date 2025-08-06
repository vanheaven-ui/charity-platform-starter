// app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import {
  getDonationsByProject,
  getMonthlyDonations,
  getProjects,
} from "../../lib/api";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Project {
  id: number;
  name: string;
}

interface ChartDataPoint {
  projectId: number;
  _sum: {
    amount: number;
  };
}

interface MonthlyDonation {
  month: string;
  totalAmount: number;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [donationsByProject, setDonationsByProject] = useState<
    ChartDataPoint[]
  >([]);
  const [monthlyDonations, setMonthlyDonations] = useState<MonthlyDonation[]>(
    []
  );
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }

    if (user) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const [allProjects, projectsData, monthlyData] = await Promise.all([
              getProjects(),
              getDonationsByProject(token),
              getMonthlyDonations(token),
            ]);

            // Log the raw data to the browser console for debugging
            console.log("Fetched Projects:", allProjects);
            console.log("Fetched Donations by Project:", projectsData);
            console.log("Fetched Monthly Donations:", monthlyData);

            // Set states with the fetched data
            setProjects(allProjects);
            setDonationsByProject(projectsData);
            setMonthlyDonations(monthlyData);
          }
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        }
      };
      fetchData();
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Bar Chart Data & Options
  const getProjectName = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId);
    return project ? project.name : `Project ${projectId}`;
  };

  const barChartData = {
    labels: donationsByProject.map((d) => getProjectName(d.projectId)),
    datasets: [
      {
        label: "Total Donations ($)",
        data: donationsByProject.map((d) => d._sum.amount),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data & Options
  const lineChartData = {
    labels: monthlyDonations.map((d) => d.month),
    datasets: [
      {
        label: "Monthly Donations ($)",
        data: monthlyDonations.map((d) => d.totalAmount),
        fill: true,
        borderColor: "rgb(234, 179, 8)", // Tailwind yellow-500
        backgroundColor: "rgba(234, 179, 8, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const barChartOptions = {
    // ... (same as before) ...
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Donations by Project",
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const lineChartOptions = {
    // ... (same as before) ...
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Donations Over Time",
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-6">This is your personal dashboard.</p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Donation Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Bar options={barChartOptions} data={barChartData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Line options={lineChartOptions} data={lineChartData} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
