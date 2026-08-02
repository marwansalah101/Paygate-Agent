import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Hero } from "./sections/Hero";
import { GateSection } from "@/components/shared/GateSection/GateSection";
import { Compare } from "./sections/Compare";
import { Pillars } from "./sections/Pillars/Pillars";
import { TrustStrip } from "./sections/TrustStrip";
import { Engagement } from "./sections/Engagement";
import { DemoRequest } from "./sections/DemoRequest";

export function HomeView() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Compare />
        <Pillars />
        <Engagement />
        <GateSection />
        <DemoRequest />
      </main>
      <Footer />
    </>
  );
}
