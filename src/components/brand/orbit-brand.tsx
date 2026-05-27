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
        width={compact ? 192 : 240}
        height={compact ? 66 : 84}
        priority
        className={cn(
          "w-auto object-contain object-left",
          compact ? "h-12 sm:h-14" : "h-16 sm:h-[4.5rem]"
        )}
      />
      {showTagline && (
        <p
          suppressHydrationWarning
          className={cn(
            "mt-2 leading-snug text-purple-300/90",
            compact ? "truncate text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs"
          )}
        >
          {ORBIT_TAGLINE}
        </p>
      )}
    </div>
  );
}
