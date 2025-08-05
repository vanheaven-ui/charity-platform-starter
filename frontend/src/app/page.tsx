"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleDonateClick = () => {
    router.push("/projects");
  };

  return (
    <main className="relative container mx-auto p-8 z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <section className="text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
          Making a Difference Together
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Join us in our mission to empower communities and create lasting
          change in Uganda.
        </p>
        <button
          onClick={handleDonateClick}
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Donate Now
        </button>
      </section>
    </main>
  );
}
