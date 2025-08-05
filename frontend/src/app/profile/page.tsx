"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../lib/api";

export default function Profile() {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredLanguage: "",
  });
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        preferredLanguage: user.preferredLanguage || "",
      });
    }
  }, [user, loading, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const updateData = password ? { ...formData, password } : formData;
        const updatedUser = await updateProfile(updateData, token);

        setUser(updatedUser); // Update the user state in context
        alert("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setApiLoading(false);
    }
  };

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              disabled={!isEditing}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              disabled={!isEditing}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Preferred Language</label>
            <input
              type="text"
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <div>
              <label className="block text-gray-700">
                New Password (optional)
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          )}
          {isEditing && (
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
              disabled={apiLoading}
            >
              {apiLoading ? "Saving..." : "Save Changes"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
