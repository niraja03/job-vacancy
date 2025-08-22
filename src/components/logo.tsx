import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-8 w-8 text-primary", className)}
    >
      <path d="M12 2L12 8" />
      <path d="M12 14L12 22" />
      <path d="M17 3L15 5" />
      <path d="M7 3L9 5" />
      <path d="M21 15L19 17" />
      <path d="M3 15L5 17" />
      <path d="M12 14a4.5 4.5 0 00-4.5 4.5c0 1.93 1.12 3.58 2.7 4.34" />
      <path d="M12 14a4.5 4.5 0 014.5 4.5c0 1.93-1.12 3.58-2.7 4.34" />
      <path d="M12 8a4.5 4.5 0 004.5-4.5C16.5 1.57 15.38.08 13.7.66" />
      <path d="M12 8A4.5 4.5 0 007.5 3.5c0-1.93 1.12-3.58 2.7-4.34" />
    </svg>
  );
}
