import { ArrowUpRight } from "lucide-react";
import { REFERENCES } from "@/data/site";
import { Reveal } from "./Reveal";

// Placeholder vaka kartları — gerçek logo, marka adı, şube sayısı ve sonuç metinleri
// hazır olduğunda /src/data/site.js üzerinden doldurulacak. Uydurma veri kullanılmadı.
export const CaseCards = ({ solution }) => {
  const items = REFERENCES.filter((r) => !solution || r.solution === solution);
  return (
    <div className="grid gap-5 md:grid-cols-3" data-testid="case-cards">
      {items.map((r, i) => (
        <Reveal key={r.id} delay={i * 0.08}>
          <article
            className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_60px_rgba(16,17,16,0.08)]"
            data-testid={`case-card-${r.id}`}
          >
            <div className="flex h-16 items-center justify-center rounded-2xl border border-dashed border-line bg-mist">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-mute">Logo yakında</span>
            </div>
            <h3 className="mt-6 text-lg font-bold text-ink">{r.name}</h3>
            <p className="mt-1 text-sm text-mute">Şube sayısı: —</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {r.services.map((s) => (
                <span key={s} className="rounded-full border border-line bg-mist px-3 py-1 text-[11px] font-bold text-ink">
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-mute">
              Vaka çalışması içeriği ekleniyor. Gerçek müşteri sonuçları yayınlandığında burada yer alacak.
            </p>
            <span
              className="mt-6 inline-flex cursor-default items-center gap-1.5 text-sm font-bold text-mute"
              title="Yakında"
              data-testid={`case-link-${r.id}`}
            >
              Hikâyeyi İncele
              <ArrowUpRight className="h-4 w-4" />
              <span className="rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Yakında</span>
            </span>
          </article>
        </Reveal>
      ))}
    </div>
  );
};
