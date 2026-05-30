export const PROTOCOL_LOGOS = {
  Across: "/images/protocols/across.webp",
  Aerodrome: "/images/protocols/aerodrome.png",
  Avantis: "/images/protocols/avantis.png",
  Limitless: "/images/Limitless.icon.jpg",
  Monad: "/images/protocols/monad.webp",
  Stargate: "/images/protocols/stargate.webp",
  Zora: "/images/protocols/zora.jpg",
} as const;

export type ProtocolName = keyof typeof PROTOCOL_LOGOS;
