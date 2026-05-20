import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 64, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/favicon.png"
        alt="NAUSKILL"
        width={size}
        height={size}
        className="shrink-0 w-12 h-12 sm:w-auto sm:h-auto"
        priority
      />
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
