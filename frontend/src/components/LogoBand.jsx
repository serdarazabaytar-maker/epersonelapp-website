import { Reveal } from "./Reveal";

// Placeholder yapı — gerçek müşteri logoları /public/assets/references altına eklendiğinde
// bu liste gerçek logolarla doldurulacak. Gri kutu → gerçek logo geçişi hover'da renklenir.
const SLOTS = Array.from({ length: 8 }, (_, i) => `Marka ${String(i + 1).padStart(2, "0")}`);

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
        {[...SLOTS, ...SLOTS].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex h-16 w-44 shrink-0 items-center justify-center rounded-2xl border border-dashed border-line bg-mist grayscale transition-all duration-500 hover:border-ink hover:grayscale-0"
            aria-hidden={i >= SLOTS.length}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-mute">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
