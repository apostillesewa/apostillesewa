import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Hero } from "@/components/site/Hero";
import { AuthorityStrip } from "@/components/site/AuthorityStrip";
import { Process } from "@/components/site/Process";
import { Destinations } from "@/components/site/Destinations";
import { SocialProof } from "@/components/site/SocialProof";
import { ScreeningCTA } from "@/components/site/ScreeningCTA";
import { Footer } from "@/components/site/Footer";
import { MobileTabBar } from "@/components/site/MobileTabBar";

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
  const hash = useRouterState({ select: (s) => s.location.hash });
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.replace(/^#/, ""));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }, [hash]);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">

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
      <MobileTabBar />
    </div>
  );
}
