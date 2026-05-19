import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Hero } from "@/components/site/Hero";
import { AuthorityStrip } from "@/components/site/AuthorityStrip";
import { Process } from "@/components/site/Process";
import { Destinations } from "@/components/site/Destinations";
import { SocialProof } from "@/components/site/SocialProof";
import { ScreeningCTA } from "@/components/site/ScreeningCTA";
import { Footer } from "@/components/site/Footer";

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
        <AuthorityStrip />
        <Process />
        <Destinations />
        <SocialProof />
        <ScreeningCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
