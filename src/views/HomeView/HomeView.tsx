import { Header } from "@/components/layout/Header";
import { Hero } from "./sections/Hero";
import { Compare } from "./sections/Compare";
import { Pillars } from "./sections/Pillars/Pillars";
import { TrustStrip } from "./sections/TrustStrip";
import { Engagement } from "./sections/Engagement";
import { DemoRequest } from "./sections/DemoRequest";

export function HomeView() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Compare />
        <Pillars />
        <TrustStrip />
        <Engagement />
        <DemoRequest />
      </main>
    </>
  );
}
