import Image from "next/image";
import { cn } from "@/lib/utils";
import { PROTOCOL_LOGOS, type ProtocolName } from "@/lib/protocol-logos";

interface ProtocolIconProps {
  name: ProtocolName;
  size?: "sm" | "md";
  className?: string;
}

const sizeMap = {
  sm: { box: "h-7 w-7", image: 28 },
  md: { box: "h-8 w-8", image: 32 },
} as const;

export function ProtocolIcon({ name, size = "md", className }: ProtocolIconProps) {
  const dimensions = sizeMap[size];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black/30 ring-1 ring-white/10",
        dimensions.box,
        className
      )}
    >
      <Image
        src={PROTOCOL_LOGOS[name]}
        alt={`${name} logo`}
        width={dimensions.image}
        height={dimensions.image}
        className="h-full w-full object-contain p-0.5"
      />
    </div>
  );
}
