"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { updateProfile, Role } from "@/lib/api"; 
import { Button } from "@/components/Button";

// The FormData interface now uses the imported Role type
interface FormData {
  name: string;
  email: string;
  preferredLanguage: string;
  role: Role;
}

export default function Profile() {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    preferredLanguage: "",
    role: "Member", 
  });
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // List of all possible roles to populate the dropdown
  const allRoles: Role[] = [
    "Admin",
    "Donor",
    "Beneficiary",
    "Partner",
    "Supplier",
    "BoardMember",
    "Volunteer",
    "Member",
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      setFormData({
        name: user.name ?? "",
        email: user.email ?? "",
        preferredLanguage: user.preferredLanguage ?? "",
        role: user.role ?? "Member", // Ensure default role is from the new list
      });
    }
  }, [user, loading, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as Role })); // Ensure role is cast to the correct type
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const updateData = password ? { ...formData, password } : formData;
        const updatedUser = await updateProfile(updateData, token);
        setUser(updatedUser);
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        setPassword("");
      }
    } catch (err: unknown) {
      console.error("Failed to update profile:", err);
      const errorMessage =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        (err as any).response?.data?.error
          ? (err as any).response.data.error
          : "Failed to update profile. Please try again.";
      setError(errorMessage);
    } finally {
      setApiLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="min-h-screen p-8">
        <div className="container mx-auto py-12 px-4">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 bg-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "secondary" : "primary"}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            {error && (
              <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-md border border-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-md border border-green-200">
                {success}
              </div>
            )}

            {!isEditing ? (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-500">Name</p>
                  <p className="text-lg text-gray-800">{user.name}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-500">Email</p>
                  <p className="text-lg text-gray-800">{user.email}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-500">Role</p>
                  <p className="text-lg text-gray-800">{user.role}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-500">
                    Preferred Language
                  </p>
                  <p className="text-lg text-gray-800">
                    {user.preferredLanguage || "Not specified"}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    {allRoles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="preferredLanguage"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preferred Language
                  </label>
                  <input
                    type="text"
                    id="preferredLanguage"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={apiLoading}
                    size="md"
                    className="w-full"
                  >
                    {apiLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
