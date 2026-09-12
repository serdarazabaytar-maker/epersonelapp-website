import { REFERENCES } from "@/data/site";
import { Reveal } from "./Reveal";

// Referans kartları — yalnızca doğrulanmış alanlar gösterilir: logo, marka adı, kullanılan hizmetler.
// Gerçek logo dosyaları geldiğinde data dosyasındaki `logo` alanı doldurulacak;
// o zamana kadar marka baş harfinden oluşan monogram gösterilir.
export const CaseCards = ({ solution, limit }) => {
  let items = REFERENCES.filter((r) => !solution || r.solution === solution);
  if (limit) items = items.slice(0, limit);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="case-cards">
      {items.map((r, i) => (
        <Reveal key={r.id} delay={(i % 3) * 0.08}>
          <article
            className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_60px_rgba(16,17,16,0.08)]"
            data-testid={`case-card-${r.id}`}
          >
            {r.logo ? (
              <div className="flex h-16 items-center justify-center rounded-2xl border border-line bg-mist px-4 grayscale transition-all duration-500 group-hover:grayscale-0">
                <img src={r.logo} alt={`${r.name} logosu`} className="max-h-9 w-auto object-contain" loading="lazy" />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink text-white">
                <span className="text-2xl font-extrabold tracking-tight">{r.name.charAt(0)}</span>
              </div>
            )}
            <h3 className="mt-6 text-lg font-bold text-ink">{r.name}</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {r.services.map((s) => (
                <span key={s} className="rounded-full border border-line bg-mist px-3 py-1 text-[11px] font-bold text-ink">
                  {s}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
};
