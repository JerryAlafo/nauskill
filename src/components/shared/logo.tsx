import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 32, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Círculo exterior ciano */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />
        {/* Âncora estilizada */}
        <path
          d="M24 10v22m0 0c-4 0-8-3-8-7m8 7c4 0 8-3 8-7M18 14h12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        {/* Detalhe dourado discreto */}
        <circle cx="24" cy="14" r="2.5" fill="#C9A227" />
        {/* Ondas inferiores */}
        <path
          d="M10 38c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 7 0 4.5 2 7 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary opacity-60"
        />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-lg font-semibold tracking-tight">
            NAU<span className="text-primary">SKILL</span>
          </span>
          <span className="text-[10px] text-muted-foreground tracking-wider hidden sm:block">
            FORMAÇÃO MARÍTIMA DIGITAL
          </span>
        </div>
      )}
    </div>
  );
}
