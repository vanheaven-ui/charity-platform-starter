"use client";
import { useState, useEffect } from "react";
import { getAllEvents } from "@/lib/api"; // Adjust import path if necessary
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/Button"; // Reusable Button component

interface Event {
  id: number;
  title: string;
  description: string;
  locationName: string;
  eventDate: string; // ISO string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            "Failed to load events. Please try again later."
        );
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="pt-16">
      <div className="container mx-auto p-8 pt-24 min-h-screen">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
          Upcoming Community Events
        </h1>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600 text-lg">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600 text-lg">
              No upcoming events found at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h2>
                  <p className="text-sm text-blue-600 font-semibold mb-3">
                    {format(
                      new Date(event.eventDate),
                      "EEEE, MMMM d, yyyy 'at' h:mm a"
                    )}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
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
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
