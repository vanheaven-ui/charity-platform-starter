"use client";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleDonateClick = () => {
    router.push("/projects");
  };

  return (
    <main>
      <section className="relative flex flex-col items-center justify-center min-h-screen py-16 text-center text-white bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 opacity-60"></div>
        <div className="relative container mx-auto p-8 z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fadeInUp">
            Your Contribution, Their Future
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto animate-fadeInUp delay-100">
            A transparent platform for a world of difference. See every step of
            your donation's journey.
          </p>
          <Button
            onClick={handleDonateClick}
            className="hover:bg-gray-200 font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 animate-fadeInUp delay-200"
          >
            Explore Projects
          </Button>
        </div>
      </section>

      <section className="py-24 bg-white text-gray-800">
        <div className="container mx-auto px-8">
          <h3 className="text-4xl font-bold text-center mb-16">
            The Journey of Your Impact
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">
            <div className="relative h-64 lg:h-96 w-full rounded-3xl shadow-xl overflow-hidden transform lg:-rotate-3 transition-transform hover:rotate-0">
              <Image
                src="/images/how-it-works-1.jpg"
                alt="Discover Projects"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <span className="text-6xl font-extrabold text-blue-500 block mb-4">
                01
              </span>
              <h4 className="text-3xl font-semibold mb-3">
                Find a Cause You Love
              </h4>
              <p className="text-lg text-gray-600">
                Browse our curated list of projects, each with a clear mission
                and tangible goals. Our platform connects you directly to the
                stories behind the work.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24 mt-24">
            <div className="order-2 lg:order-1 p-6">
              <span className="text-6xl font-extrabold text-purple-500 block mb-4">
                02
              </span>
              <h4 className="text-3xl font-semibold mb-3">
                Donate Securely & Transparently
              </h4>
              <p className="text-lg text-gray-600">
                Your contribution is processed securely and allocated directly
                to your chosen project. We provide full transparency on every
                transaction.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative h-64 lg:h-96 w-full rounded-3xl shadow-xl overflow-hidden transform lg:rotate-3 transition-transform hover:rotate-0">
              <Image
                src="/images/how-it-works-2.jpg"
                alt="Make a Donation"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24 mt-24">
            <div className="relative h-64 lg:h-96 w-full rounded-3xl shadow-xl overflow-hidden transform lg:-rotate-3 transition-transform hover:rotate-0">
              <Image
                src="/images/how-it-works-3.jpg"
                alt="Track Impact"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <span className="text-6xl font-extrabold text-pink-500 block mb-4">
                03
              </span>
              <h4 className="text-3xl font-semibold mb-3">
                See Your Impact Unfold
              </h4>
              <p className="text-lg text-gray-600">
                Receive real-time updates, photos, and reports from the field.
                You get to witness the positive change you helped create, every
                step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-8">
          <h3 className="text-4xl font-bold text-center mb-16">
            The Numbers Tell Our Story
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-10 bg-white rounded-3xl shadow-lg transition-transform transform hover:scale-105">
              <h4 className="text-5xl md:text-6xl font-extrabold text-green-600 mb-2">
                15+
              </h4>
              <p className="text-xl text-gray-600">Projects Funded</p>
            </div>
            <div className="p-10 bg-white rounded-3xl shadow-lg transition-transform transform hover:scale-105">
              <h4 className="text-5xl md:text-6xl font-extrabold text-green-600 mb-2">
                500+
              </h4>
              <p className="text-xl text-gray-600">Dedicated Donors</p>
            </div>
            <div className="p-10 bg-white rounded-3xl shadow-lg transition-transform transform hover:scale-105">
              <h4 className="text-5xl md:text-6xl font-extrabold text-green-600 mb-2">
                $50K+
              </h4>
              <p className="text-xl text-gray-600">Raised to Date</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-8">
          <h3 className="text-4xl font-bold mb-4">
            Join a Global Community of Givers
          </h3>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Ready to be a part of the change? Your journey begins here.
          </p>
          <Button
            onClick={handleDonateClick}
            className="by-white-600 text-blue-600 hover:bg-gray-200 font-bold py-3 px-8 rounded-full"
          >
            Start Donating
          </Button>
        </div>
      </section>
    </main>
  );
}
