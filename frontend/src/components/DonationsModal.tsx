import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createDonation } from "../lib/api";

interface DonationModalProps {
  projectId: number;
  projectName: string;
  onClose: () => void;
  onDonationSuccess: () => void;
}

export default function DonationModal({
  projectId,
  projectName,
  onClose,
  onDonationSuccess,
}: DonationModalProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || amount <= 0) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await createDonation({ projectId, amount, message }, token);
        onDonationSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Failed to create donation:", error);
      alert("Failed to process donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Donate to {projectName}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-300"
            disabled={loading}
          >
            {loading ? "Processing..." : `Donate $${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
}
