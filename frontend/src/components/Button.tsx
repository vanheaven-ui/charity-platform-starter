// frontend/components/Button.tsx
import React, { ReactNode } from "react";

// Simple SVG Spinner component with updated colors
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-blue-200"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  isLoading = false,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        bg-blue-600 text-white font-bold py-2 px-4 rounded transition
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <Spinner />
          {/* Changed text color to match the spinner */}
          <span className="text-blue-200">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
