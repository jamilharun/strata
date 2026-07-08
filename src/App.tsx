import { useRef } from "react";
import { usePeel } from "./hooks/usePeel";
import { usePageMotion } from "./hooks/usePageMotion";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import SplitSection from "./components/SplitSection";
import ProcessSection from "./components/ProcessSection";
import SpecsSection from "./components/SpecsSection";
import AcclaimSection from "./components/AcclaimSection";
import FounderSection from "./components/FounderSection";
import CtaSection from "./components/CtaSection";
import SiteFooter from "./components/SiteFooter";
import SideNav from "./components/SideNav";

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const { active, labels, goTo } = usePeel(mainRef);
  usePageMotion(mainRef);

  return (
    <>
      <SiteHeader />
      <main ref={mainRef}>
        <Hero />

        <SplitSection
          id="philosophy"
          image="/workshop.png"
          imageAlt="A watchmaker's bench with movement components, tools, and technical drawings"
          eyebrow="The Philosophy"
          title="Nothing Superfluous."
        >
          <p className="manifesto">
            True luxury lies not in excess, but in the deliberate curation of
            the essential. Strata strips away the superfluous to expose{" "}
            <em>the pure, beating heart of horology</em>.
          </p>
          <div className="fact-row">
            <span>Est. 2024, Geneva</span>
            <span>Fifty pieces, ever</span>
            <span>One watchmaker per watch</span>
          </div>
        </SplitSection>

        <SplitSection
          id="architecture"
          image="/dial.png"
          imageAlt="Detail plate of the Caliber 1 skeleton movement — barrel, gear train, and balance wheel"
          eyebrow="Architecture"
          title={<>The Mechanism Is the&nbsp;Dial.</>}
          dark
          paneFirst
          plate
          caption={"Caliber 1 · 33 jewels · 4 Hz"}
        >
          <p>
            Every gear, every bridge, every jewel serves a purpose. Suspended
            within its sapphire and titanium housing, the movement hides nothing
            &mdash; because there is nothing to hide.
          </p>
          <ul className="numbered-list">
            <li>
              <span className="num">01</span>
              <span>
                <span className="item-title">
                  Micro-rotor automatic winding
                </span>
                <span className="item-detail">
                  Self-winding, recessed so nothing obstructs the view.
                </span>
              </span>
            </li>
            <li>
              <span className="num">02</span>
              <span>
                <span className="item-title">Hand-beveled bridges</span>
                <span className="item-detail">
                  Every edge angled and polished to catch the light.
                </span>
              </span>
            </li>
            <li>
              <span className="num">03</span>
              <span>
                <span className="item-title">Free-sprung balance wheel</span>
                <span className="item-detail">
                  No regulator pins &mdash; the rate holds steady for decades.
                </span>
              </span>
            </li>
          </ul>
        </SplitSection>

        <ProcessSection />
        <SpecsSection />
        <AcclaimSection />
        <FounderSection />
        <CtaSection />
      </main>
      <SiteFooter />
      <SideNav labels={labels} active={active} onSelect={goTo} />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[300]" />
    </>
  );
}
