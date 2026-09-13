import { useEffect, useState } from "react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { fetchReferences, referenceLogoSrc } from "@/data/references";
import { SOLUTIONS } from "@/data/site";

const FILTERS = [{ id: null, name: "Tümü" }, ...SOLUTIONS.map((s) => ({ id: s.id, name: s.name }))];

// /referanslar — zengin kart: logo, marka, çözümler + (varsa) yönetici/unvan/kısa yorum.
// Yorum veya yönetici verisi yoksa o bloklar hiç render edilmez.
const ReferenceCard = ({ r, i }) => {
  const logo = referenceLogoSrc(r);
  return (
    <Reveal delay={(i % 3) * 0.08}>
      <article
        className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_60px_rgba(16,17,16,0.08)]"
        data-testid={`reference-card-${r.id}`}
      >
        {logo && (
          <div className="mb-6 flex h-14 items-center">
            <img
              src={logo}
              alt={`${r.name} logosu`}
              className="max-h-12 w-auto max-w-[70%] object-contain object-left grayscale transition-all duration-500 group-hover:grayscale-0"
              loading="lazy"
            />
          </div>
        )}
        <h3 className="text-lg font-bold text-ink">{r.name}</h3>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(r.services || []).map((s) => (
            <span key={s} className="rounded-full border border-line bg-mist px-3 py-1 text-[11px] font-bold text-ink">
              {s}
            </span>
          ))}
        </div>
        {r.quote && <p className="mt-5 flex-1 text-[15px] leading-relaxed text-mute">“{r.quote}”</p>}
        {(r.manager_name || r.manager_title) && (
          <div className="mt-6 border-t border-line pt-4">
            {r.manager_name && <p className="text-sm font-bold text-ink">{r.manager_name}</p>}
            {r.manager_title && <p className="text-xs text-mute">{r.manager_title}</p>}
          </div>
        )}
      </article>
    </Reveal>
  );
};

export default function ReferanslarPage() {
  const [filter, setFilter] = useState(null);
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    fetchReferences().then((all) => setRefs(all.filter((r) => r.show_references)));
  }, []);

  const visible = filter ? refs.filter((r) => (r.solutions || []).includes(filter)) : refs;

  return (
    <>
      <Seo
        title="Referanslar | Epersonel"
        siteName="Epersonel"
        description="EP, EPapp, EPfood ve EPkurye çözümlerine güvenen işletmeler."
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
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((r, i) => (
              <ReferenceCard key={r.id} r={r} i={i} />
            ))}
          </div>
          {visible.length === 0 && (
            <p className="mt-12 text-center text-sm text-mute" data-testid="references-empty">
              Bu filtrede gösterilecek referans yok.
            </p>
          )}
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
