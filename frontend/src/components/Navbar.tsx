// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import { CircularTextIcon } from "./CircularTextIcon";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 100;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setScrolled(true);
    }
  }, [scrolled, isHomePage]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsTooltipVisible(false);
  };

  const navItems = (
    <>
      <li>
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="hover:text-pink-500 transition-colors"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/events"
          onClick={() => setIsOpen(false)}
          className="hover:text-pink-500 transition-colors"
        >
          Events
        </Link>
      </li>
      <li>
        <Link
          href="/projects"
          onClick={() => setIsOpen(false)}
          className="hover:text-pink-500 transition-colors"
        >
          Projects
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/my-donations"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              My Donations
            </Link>
          </li>
          {user.role === "Admin" && (
            <li>
              <Link
                href="/admin/events/"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition-colors"
              >
                Manage Events
              </Link>
            </li>
          )}
          {user.role === "Admin" && (
            <li>
              <Link
                href="/admin/projects"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition-colors"
              >
                Manage Projects
              </Link>
            </li>
          )}
          <li>
            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600 font-normal py-1 px-3 rounded-lg"
            >
              Logout
            </Button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-300 ease-in-out
        ${
          scrolled || !isHomePage
            ? "bg-slate-900 bg-opacity-90 shadow-lg py-3"
            : "bg-transparent py-6"
        }
      `}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-xl md:text-2xl font-extrabold transition-colors">
          <Link
            href="/"
            className={`${
              scrolled || !isHomePage ? "text-white" : "text-white"
            }`}
          >
            Charity Starter
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center text-white">
          {navItems}
        </ul>

        {/* Mobile Menu Button with Circular Text Icon and Tooltip */}
        <div className="relative md:hidden">
          <button
            onClick={toggleMenu}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
            className="focus:outline-none text-white"
          >
            <CircularTextIcon className="text-white" />
          </button>
          {isTooltipVisible && (
            <div className="absolute right-0 top-12 p-2 text-xs bg-gray-800 text-white rounded-md whitespace-nowrap">
              Menu
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            fixed top-0 left-0 h-full w-64 bg-slate-900 bg-opacity-95 z-50
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden
          `}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-center space-y-6 text-white text-xl p-8">
            {navItems}
          </ul>
        </div>
      </div>
    </nav>
  );
}
