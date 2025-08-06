import { useEffect, useState } from "react";
import Link from "next/link";
import type { ChartOptions, FontSpec } from "chart.js";
import {
  getDonationsByProject,
  getMonthlyDonations,
  getProjects,
} from "@/lib/api";
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

interface AdminDashboardProps {
  user: any; // User object from AuthContext
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [donationsByProject, setDonationsByProject] = useState<
    ChartDataPoint[]
  >([]);
  const [monthlyDonations, setMonthlyDonations] = useState<MonthlyDonation[]>(
    []
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const [allProjects, projectsData, monthlyData] = await Promise.all([
            getProjects(),
            getDonationsByProject(token),
            getMonthlyDonations(token),
          ]);

          setProjects(allProjects);
          setDonationsByProject(projectsData);
          setMonthlyDonations(monthlyData);
        }
      } catch (err: any) {
        setError(
          err.response?.data?.error || "Failed to fetch dashboard data."
        );
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

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
        backgroundColor: "rgba(59, 130, 246, 0.5)", // blue-500
        borderColor: "rgba(59, 130, 246, 1)", // blue-500
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: monthlyDonations.map((d) => d.month),
    datasets: [
      {
        label: "Monthly Donations ($)",
        data: monthlyDonations.map((d) => d.totalAmount),
        fill: true,
        borderColor: "rgb(234, 179, 8)", // yellow-500
        backgroundColor: "rgba(234, 179, 8, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          } as Partial<FontSpec>,
          color: "#374151",
        },
      },
      title: {
        display: true,
        font: {
          size: 18,
          weight: "bold",
        } as Partial<FontSpec>,
        color: "#1F2937",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        bodyColor: "#fff",
        titleColor: "#fff",
        padding: 10,
        cornerRadius: 5,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4B5563",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#4B5563",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600 text-lg">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Overview</h2>

      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg h-96">
          <Bar
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Donations by Project",
                },
              },
            }}
            data={barChartData}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg h-96">
          <Line
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: "Monthly Donations Over Time",
                },
              },
            }}
            data={lineChartData}
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-6">Admin Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/projects"
          className="block p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <h4 className="text-xl font-semibold text-blue-800 mb-2">
            Manage Projects
          </h4>
          <p className="text-gray-700 text-sm">
            Create, update, and delete charity projects.
          </p>
        </Link>
        <Link
          href="/admin/events"
          className="block p-6 bg-green-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <h4 className="text-xl font-semibold text-green-800 mb-2">
            Manage Events
          </h4>
          <p className="text-gray-700 text-sm">
            Oversee community events, volunteers, and schedules.
          </p>
        </Link>
        <Link
          href="/admin/users"
          className="block p-6 bg-purple-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <h4 className="text-xl font-semibold text-purple-800 mb-2">
            Manage Users
          </h4>
          <p className="text-gray-700 text-sm">
            View and manage user accounts and roles.
          </p>
        </Link>
      </div>
    </div>
  );
}
