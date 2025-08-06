// app/events/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventById, signUpForEvent } from "@/lib/api"; // Adjust import path
import { useAuth } from "@/context/AuthContext"; // Adjust import path
import { format } from "date-fns";
import { Button } from "@/components/Button"; // Reusable Button component
import { GoogleMapComponent } from "@/components/GoogleMapComponent"; // Create this component next
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  locationName: string;
  locationLat: number;
  locationLng: number;
  eventDate: string; // ISO string
}

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // Get user and authLoading from AuthContext
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getEventById(Number(id));
          setEvent(data);
        } catch (err: any) {
          setError(
            err.response?.data?.error || "Failed to load event details."
          );
          console.error("Error fetching event:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [id]);

  const handleSignUp = async () => {
    // This check is technically redundant now due to rendering logic, but good for safety
    if (!user || !user.token) {
      setError("Authentication error. Please log in again.");
      return;
    }

    setIsSigningUp(true);
    setError(null);
    setSignUpSuccess(null);

    try {
      await signUpForEvent(Number(id), user.token);
      setSignUpSuccess("Successfully signed up for the event!");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to sign up for the event.");
      console.error("Error signing up:", err);
    } finally {
      setIsSigningUp(false);
    }
  };

  if (loading || authLoading) { // Added authLoading to ensure user state is ready
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
        <p className="text-gray-600 text-lg">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
        <p className="text-red-600 text-lg">{error || "Event not found."}</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {event.title}
            </h1>
            <p className="text-lg text-blue-600 font-semibold mb-6">
              {format(
                new Date(event.eventDate),
                "EEEE, MMMM d, yyyy 'at' h:mm a"
              )}
            </p>

            <p className="text-gray-700 text-lg mb-6">{event.description}</p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Location: {event.locationName}
              </h2>
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-md border border-gray-200">
                <GoogleMapComponent
                  center={{ lat: event.locationLat, lng: event.locationLng }}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md border border-red-200">
                {error}
              </div>
            )}
            {signUpSuccess && (
              <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md border border-green-200">
                {signUpSuccess}
              </div>
            )}

            {user ? ( // User is logged in
              user.role === "Volunteer" ? ( // And they are a volunteer
                <Button
                  onClick={handleSignUp}
                  isLoading={isSigningUp}
                  variant="primary"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Sign Up for Event
                </Button>
              ) : ( // They are logged in, but not a volunteer
                <div className="text-center md:text-left p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-700 mb-4">
                    You are currently logged in as a **{user.role}**. To sign up for events and contribute your time, please update your role to 'Volunteer' in your profile.
                  </p>
                  <Link href="/profile" passHref legacyBehavior>
                    <Button variant="secondary" size="md">
                      Update Profile to Volunteer
                    </Button>
                  </Link>
                </div>
              )
            ) : ( // User is not logged in
              <div className="text-center md:text-left p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-700 mb-4">
                  Please{" "}
                  <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                    log in
                  </Link>{" "}
                  to sign up for this event. If you don't have an account, you can{" "}
                  <Link href="/register" className="text-blue-600 hover:underline font-semibold">
                    register here
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}