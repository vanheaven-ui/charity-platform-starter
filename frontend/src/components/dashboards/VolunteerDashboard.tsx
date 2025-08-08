import { useEffect, useState } from "react";
import Link from "next/link";
import { Event, getSignedUpEvents } from "@/lib/api";
import { format } from "date-fns";
import { Button } from "@/components/Button";

interface VolunteerDashboardProps {
  user: any;
}

export default function VolunteerDashboard({ user }: VolunteerDashboardProps) {
  const [signedUpEvents, setSignedUpEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getSignedUpEvents(token);
          setSignedUpEvents(data);
        }
      } catch (err: any) {
        setError(
          err.response?.data?.error || "Failed to fetch your signed-up events."
        );
        console.error("Failed to fetch signed-up events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600 text-lg">Loading volunteer dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Your Volunteering Activities
      </h2>

      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {signedUpEvents.length === 0 ? (
        <p className="text-gray-600 text-lg text-center py-10">
          You haven&apos;t signed up for any events yet.
          <Link href="/events" className="text-blue-600 hover:underline">
            Explore upcoming events
          </Link>{" "}
          to find opportunities!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signedUpEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-sm p-6 transition-shadow duration-300 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-blue-600 font-medium mb-3">
                {format(
                  new Date(event.eventDate),
                  "EEEE, MMMM d, yyyy 'at' h:mm a"
                )}
              </p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {event.description}
              </p>
              <p className="text-gray-600 text-sm flex items-center mb-4">
                <svg
                  className="w-4 h-4 mr-2 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {event.locationName}
              </p>
              <div className="flex justify-end mt-4">
                <Link href={`/events/${event.id}`} passHref legacyBehavior>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
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
            Update your personal information.
          </p>
        </Link>
        <Link
          href="/events"
          className="block p-6 bg-green-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <h4 className="text-xl font-semibold text-green-800 mb-2">
            Explore More Events
          </h4>
          <p className="text-gray-700 text-sm">
            Find new volunteering opportunities.
          </p>
        </Link>
      </div>
    </div>
  );
}
