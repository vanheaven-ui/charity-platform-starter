"use client";
import { useState } from "react";
import { loginUser, verifyFirebaseToken } from "../../lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/Button";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await loginUser(formData);
      login(res.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as any).response === "object" &&
        "data" in (err as any).response &&
        typeof (err as any).response.data === "object" &&
        "error" in (err as any).response.data
      ) {
        setError((err as any).response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Use the imported service function to verify the Firebase token
      const customToken = await verifyFirebaseToken(idToken);
      if (customToken) {
        login(customToken);
        router.push("/dashboard");
      } else {
        throw new Error("Failed to authenticate with backend.");
      }
    } catch (err) {
      setError("Google Sign-In failed. Please try again.");
      console.error("Google sign-in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105">
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              Login
            </Button>
          </form>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <Button
            onClick={loginWithGoogle}
            isLoading={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 font-semibold py-3 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.611 20.084H24V28.18H35.44C34.78 31.258 32.962 33.722 30.347 35.334V40.237H39.297C43.914 36.634 46.54 30.638 46.54 23.992C46.54 22.564 46.417 21.163 46.173 19.824L43.611 20.084Z"
                fill="#4285F4"
              />
              <path
                d="M24 46.54C30.312 46.54 35.798 44.57 39.297 40.237L30.347 35.334C28.272 36.721 26.068 37.525 24 37.525C17.518 37.525 11.979 33.155 10.05 27.247H0.703V32.222C2.71 39.463 9.47 44.831 17.653 46.223L24 46.54Z"
                fill="#34A853"
              />
              <path
                d="M10.05 27.247C9.553 25.815 9.297 24.348 9.297 22.846C9.297 21.344 9.553 19.877 10.05 18.445V13.47H0.703C-0.234 15.656 -0.234 18.236 0.703 20.422C1.64 22.608 3.037 24.498 5.06 25.867L10.05 27.247Z"
                fill="#FBBC04"
              />
              <path
                d="M24 9.297C27.424 9.297 30.551 10.514 33.003 12.871L40.279 5.595C36.035 2.059 30.312 0 24 0C16.924 0 10.748 3.526 7.155 8.784L15.688 13.759C17.432 11.233 20.528 9.297 24 9.297Z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign in with Google</span>
          </Button>

          <div className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
