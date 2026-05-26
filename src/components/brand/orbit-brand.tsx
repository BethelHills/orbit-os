import Image from "next/image";
import { cn } from "@/lib/utils";

export const ORBIT_TAGLINE = "AI Operating System for On-chain Actions";

interface OrbitBrandProps {
  compact?: boolean;
  showTagline?: boolean;
  className?: string;
}

export function OrbitBrand({
  compact = false,
  showTagline = true,
  className,
}: OrbitBrandProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <Image
        src="/images/OrbitOS.logo.png"
        alt="OrbitOS"
        width={compact ? 128 : 160}
        height={compact ? 44 : 56}
        priority
        className={cn(
          "w-auto object-contain object-left",
          compact ? "h-8 sm:h-9" : "h-10 sm:h-11"
        )}
      />
      {showTagline && (
        <p
          className={cn(
            "mt-1.5 leading-snug text-purple-300/90",
            compact ? "truncate text-[10px]" : "text-[11px]"
          )}
        >
          {ORBIT_TAGLINE}
        </p>
      )}
    </div>
  );
}
