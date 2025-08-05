import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import BackgroundParticles from "@/components/BakckgroundParticles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charity Platform Starter",
  description: "A template for NGO and charity organizations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative bg-gray-100 min-h-screen overflow-hidden">
          <BackgroundParticles />
          <AuthProvider>
            <Navbar />
            <div className="relative z-10 pt-16">{children}</div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
