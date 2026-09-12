import { useState } from "react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { CaseCards } from "@/components/CaseCards";
import { SOLUTIONS } from "@/data/site";

const FILTERS = [{ id: null, name: "Tümü" }, ...SOLUTIONS.map((s) => ({ id: s.id, name: s.name }))];

export default function ReferanslarPage() {
  const [filter, setFilter] = useState(null);
  return (
    <>
      <Seo
        title="Referanslar | Epersonel"
        siteName="Epersonel"
        description="EP, EPapp, EPkurye ve EPfood çözümlerine güvenen işletmeler."
      />
      <section className="pb-24 pt-36 md:pt-44" data-testid="references-page">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead
            eyebrow="REFERANSLAR"
            title="Bize güvenen markalar."
            desc="Çözümlerimize güvenen işletmelerden bazıları."
            testId="references-heading"
          />
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-1.5" role="tablist" aria-label="Çözüm filtresi">
              {FILTERS.map((f) => (
                <button
                  key={f.name}
                  role="tab"
                  aria-selected={filter === f.id}
                  data-testid={`filter-${f.id || "all"}`}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300 ${
                    filter === f.id ? "bg-ink text-white" : "border border-line bg-white text-mute hover:text-ink"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="mt-12">
            <CaseCards solution={filter} />
          </div>
          <Reveal className="mt-20">
            <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-line bg-mist p-10 md:flex-row md:items-center md:p-14">
              <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
                Sıradaki başarı hikâyesi sizinki olsun.
              </h2>
              <CTAButton to="/iletisim" testId="references-cta">
                Görüşme Planla
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
