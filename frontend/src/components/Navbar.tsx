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
      setScrolled(true); // Always show solid background on non-homepage
    }
  }, [scrolled, isHomePage]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsTooltipVisible(false); // Hide tooltip when menu is toggled
  };

  // Common links for all users
  const commonNavItems = (
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
    </>
  );

  // Role-based items
  const roleSpecificNavItems = () => {
    if (!user) return null;

    switch (user.role) {
      case "Admin":
        return (
          <>
            <li>
              <Link
                href="/admin/events"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition-colors"
              >
                Manage Events
              </Link>
            </li>
            <li>
              <Link
                href="/admin/projects"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition-colors"
              >
                Manage Projects
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition-colors"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/proposals"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition-colors"
              >
                Manage Proposals
              </Link>
            </li>
          </>
        );
      case "Donor":
        return (
          <li>
            <Link
              href="/my-donations"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              My Donations
            </Link>
          </li>
        );
      case "Volunteer":
        return (
          <li>
            <Link
              href="/my-volunteering"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              My Volunteering
            </Link>
          </li>
        );
      case "Partner":
        return (
          <li>
            <Link
              href="/my-partnerships"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              My Partnerships
            </Link>
          </li>
        );
      case "Beneficiary":
        return (
          <li>
            <Link
              href="/my-support"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              My Support
            </Link>
          </li>
        );
      case "Member":
        return (
          <li>
            <Link
              href="/my-membership"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              My Membership
            </Link>
          </li>
        );
      case "BoardMember":
        return (
          <li>
            <Link
              href="/board-dashboard"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Board Dashboard
            </Link>
          </li>
        );
      case "Supplier":
        return (
          <li>
            <Link
              href="/supplier-dashboard"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Supplier Dashboard
            </Link>
          </li>
        );
      default:
        return null;
    }
  };

  // Optional profile link for non-admin users
  const authenticatedNavItems = () => {
    if (!user) return null;

    switch (user.role) {
      case "Admin":
        return null;
      default:
        return (
          <li>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="hover:text-pink-500 transition-colors"
            >
              Profile
            </Link>
          </li>
        );
    }
  };

  const authButtons = user ? (
    <li>
      <Button
        onClick={handleLogout}
        className="bg-red-500 text-white hover:bg-red-600 font-normal py-1 px-3 rounded-lg"
      >
        Logout
      </Button>
    </li>
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
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled || !isHomePage
          ? "bg-slate-900 bg-opacity-90 shadow-lg py-3"
          : "bg-transparent py-6"
      }`}
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
          {commonNavItems}
          {roleSpecificNavItems()}
          {authenticatedNavItems()}
          {authButtons}
        </ul>

        {/* Mobile Menu Button */}
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
          className={`fixed top-0 left-0 h-full w-64 bg-slate-900 bg-opacity-95 z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
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
            {commonNavItems}
            {roleSpecificNavItems()}
            {authenticatedNavItems()}
            {authButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
}
