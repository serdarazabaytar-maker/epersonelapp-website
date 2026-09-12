import { REFERENCES } from "@/data/site";
import { Reveal } from "./Reveal";

// Referans logo bandı — gerçek logo dosyaları (/public/assets/references) eklendiğinde
// data'daki `logo` alanı doldurulur; o zamana kadar marka adı wordmark olarak gösterilir.
// Logolar gri/monochrome başlar, hover'da gerçek rengine döner.
export const LogoBand = () => (
  <section className="border-y border-line bg-white py-14" aria-label="Referanslar" data-testid="logo-band">
    <Reveal>
      <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-mute">
        Bize güvenen markalardan bazıları
      </p>
    </Reveal>
    <div className="relative mt-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
      <div className="marquee-track gap-4 pr-4">
        {[...REFERENCES, ...REFERENCES].map((r, i) => (
          <div
            key={`${r.id}-${i}`}
            className="group flex h-16 w-48 shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-5 transition-all duration-500 hover:border-ink"
            aria-hidden={i >= REFERENCES.length}
            data-testid={i < REFERENCES.length ? `marquee-brand-${r.id}` : undefined}
          >
            {r.logo ? (
              <img
                src={r.logo}
                alt={`${r.name} logosu`}
                className="max-h-8 w-auto object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                loading="lazy"
              />
            ) : (
              <span className="whitespace-nowrap text-sm font-extrabold tracking-tight text-mute transition-colors duration-500 group-hover:text-ink">
                {r.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);
