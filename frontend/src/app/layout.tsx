"use client";
import { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import BackgroundSVG from "../components/backgroundSVG";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative bg-gray-100 min-h-screen overflow-hidden">
          <BackgroundSVG />
          <AuthProvider>
            <div className="relative z-10">
              <Navbar />
              {children}
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
