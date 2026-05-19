import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Hero } from "@/components/site/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apostille Sewa — Fast Apostille & Embassy Legalization in Nepal" },
      {
        name: "description",
        content:
          "Expert MOFA attestation, PCC, and European embassy legalization from Kathmandu. 100% acceptance guarantee for Poland, Germany, Croatia, Malta, Portugal, Cyprus.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
      </main>
      <FloatingWhatsApp />
    </div>
  );
}
