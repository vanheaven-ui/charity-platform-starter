import Link from "next/link";

interface BeneficiaryDashboardProps {
  user: any; 
}

export default function BeneficiaryDashboard({
  user,
}: BeneficiaryDashboardProps) {
  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-md border border-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, {user.name}!
      </h2>
      <p className="text-gray-700 text-lg mb-8">
        This is your beneficiary dashboard. Here you will find updates on the
        support you&lsquo;ve received and relevant project information.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
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
          href="/contact" // Assuming a contact page exists or will be created
          className="block p-6 bg-purple-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <h4 className="text-xl font-semibold text-purple-800 mb-2">
            Contact Support
          </h4>
          <p className="text-gray-700 text-sm">
            Get assistance or provide feedback.
          </p>
        </Link>
      </div>
    </div>
  );
}
