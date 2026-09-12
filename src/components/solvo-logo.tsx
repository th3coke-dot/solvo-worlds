import { cn } from "@/lib/utils";

type SolvoLogoProps = {
  wordmark: string;
  className?: string;
};

export function SolvoLogo({ wordmark, className }: SolvoLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 32"
        className="h-7 w-11 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M7.4 10.1c0-3.6 3.1-6.1 7.3-6.1 2.8 0 5.1 1 6.4 2.8l-2.6 1.9c-.8-1-2.1-1.7-3.7-1.7-2 0-3.4 1-3.4 2.5 0 1.3.9 2.1 3.3 2.7l2 .5c3.8.9 6.2 2.9 6.2 6.2 0 3.8-3.3 6.4-7.8 6.4-3.3 0-6-1.3-7.5-3.4l2.7-2c1 1.4 2.7 2.2 4.8 2.2 2.2 0 3.8-1.1 3.8-2.8 0-1.4-1-2.2-3.5-2.8l-2-.5C10.1 16.1 7.4 14 7.4 10.1Z"
          fill="var(--color-teal)"
        />
        <circle
          cx="33.2"
          cy="16"
          r="8.05"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="3.1"
        />
      </svg>
      <span className="text-[13px] font-semibold tracking-[0.22em] text-cream">
        {wordmark}
      </span>
    </div>
  );
}
