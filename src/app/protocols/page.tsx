import { ProtocolCards } from "@/components/protocol-cards/protocol-cards";

export default function ProtocolsPage() {
  return (
    <main className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Protocols</h1>
      <ProtocolCards />
    </main>
  );
}
