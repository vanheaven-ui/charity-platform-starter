"use client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function BackgroundSVG({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 z-0", className)}>
      <svg className="absolute inset-0 h-full w-full opacity-40 [mask-image:radial-gradient(100%_50%_at_top_center,white,transparent)]">
        <defs>
          <pattern
            id="svg-pattern"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M-10 80L80 -10ZM-10 -10L80 80Z"
              stroke="#94a3b8"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#svg-pattern)" />
      </svg>
    </div>
  );
}
