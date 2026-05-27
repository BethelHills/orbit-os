export const PROTOCOL_LOGOS = {
  Aerodrome: "/images/protocols/aerodrome.png",
  Zora: "/images/protocols/zora.jpg",
  Limitless: "/images/protocols/limitless.png",
  Avantis: "/images/protocols/avantis.png",
} as const;

export type ProtocolName = keyof typeof PROTOCOL_LOGOS;
