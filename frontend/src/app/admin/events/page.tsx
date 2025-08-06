"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "@/lib/api";
import { format } from "date-fns";

interface Event {
  id: number;
  title: string;
  description: string;
  locationName: string;
  locationLat: number;
  locationLng: number;
  eventDate: string;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for Create/Edit
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    locationName: "",
    locationLat: "",
    locationLng: "",
    eventDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);
  const [formIsLoading, setFormIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "Admin")) {
      router.push("/");
    } else if (user && user.role === "Admin") {
      fetchEvents();
    }
  }, [user, authLoading, router]);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
      setPageLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to load events.");
      setPageLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormIsLoading(true);
    setError(null);

    const eventData = {
      ...formData,
      locationLat: parseFloat(formData.locationLat),
      locationLng: parseFloat(formData.locationLng),
      eventDate: new Date(formData.eventDate).toISOString(),
    };

    try {
      if (user?.token) {
        if (isEditing && currentEventId) {
          await updateEvent(currentEventId, eventData, user.token);
          alert("Event updated successfully!");
        } else {
          await createEvent(eventData, user.token);
          alert("Event created successfully!");
        }
        resetForm();
        fetchEvents();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to save event.");
    } finally {
      setFormIsLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      locationName: event.locationName,
      locationLat: event.locationLat.toString(),
      locationLng: event.locationLng.toString(),
      eventDate: new Date(event.eventDate).toISOString().substring(0, 16),
    });
    setIsEditing(true);
    setCurrentEventId(event.id);
  };

  const handleDelete = async (eventId: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        if (user?.token) {
          await deleteEvent(eventId, user.token);
          alert("Event deleted successfully!");
          fetchEvents();
        }
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to delete event.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      locationName: "",
      locationLat: "",
      locationLng: "",
      eventDate: "",
    });
    setIsEditing(false);
    setCurrentEventId(null);
  };

  if (pageLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== "Admin") {
    return null;
  }

  return (
    <div className="pt-16">
      <div className="min-h-screen p-8">
        <div className="container mx-auto bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Manage Events
          </h1>

          {/* Event Form */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 border rounded-lg bg-blue-50 shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              {isEditing ? "Edit Event" : "Create New Event"}
            </h2>
            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md border border-red-200">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label htmlFor="locationName" className="block text-gray-700">
                  Location Name
                </label>
                <input
                  type="text"
                  name="locationName"
                  value={formData.locationName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="locationLat" className="block text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="locationLat"
                    value={formData.locationLat}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="locationLng" className="block text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="locationLng"
                    value={formData.locationLng}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="eventDate" className="block text-gray-700">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  disabled={formIsLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isEditing ? "Save Changes" : "Create Event"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Events List */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Existing Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-50 p-6 rounded-lg shadow-sm"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <div className="text-sm text-gray-500">
                      <p>Location: {event.locationName}</p>
                      <p>
                        Date:{" "}
                        {format(
                          new Date(event.eventDate),
                          "MMM d, yyyy h:mm a"
                        )}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No events found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
