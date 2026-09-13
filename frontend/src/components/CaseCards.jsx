import { useEffect, useState } from "react";
import { fetchReferences, referenceLogoSrc } from "@/data/references";
import { Reveal } from "./Reveal";

// Çözüm sayfası referans kartları — logo + marka adı + alınan hizmetler.
// Yönetici, unvan veya testimonial gösterilmez. Sahte logo/monogram üretilmez.
export const CaseCards = ({ solution, limit }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchReferences().then((all) => {
      let list = all.filter((r) => !solution || (r[`show_${solution}`] && (r.solutions || []).includes(solution)));
      if (limit) list = list.slice(0, limit);
      setItems(list);
    });
  }, [solution, limit]);

  if (!items.length) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="case-cards">
      {items.map((r, i) => {
        const logo = referenceLogoSrc(r);
        return (
          <Reveal key={r.id} delay={(i % 3) * 0.08}>
            <article
              className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_60px_rgba(16,17,16,0.08)]"
              data-testid={`case-card-${r.id}`}
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
            </article>
          </Reveal>
        );
      })}
    </div>
  );
};
