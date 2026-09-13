import { useEffect, useState } from "react";
import { fetchReferences, referenceLogoSrc } from "@/data/references";
import { Reveal } from "./Reveal";

// Ana sayfa logo marquee — yalnızca marka logosu (logo yoksa düz metin ad, layout bozulmaz).
// Veri merkezi referans sisteminden (admin panel) beslenir.
export const LogoBand = () => {
  const [refs, setRefs] = useState([]);
  useEffect(() => {
    fetchReferences().then((items) => setRefs(items.filter((r) => r.show_marquee)));
  }, []);
  if (!refs.length) return null;

  return (
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
          {[...refs, ...refs].map((r, i) => {
            const logo = referenceLogoSrc(r);
            return (
              <div
                key={`${r.id}-${i}`}
                className="group flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-line bg-white transition-colors duration-500 hover:border-ink sm:h-28 sm:w-28"
                aria-hidden={i >= refs.length}
                data-testid={i < refs.length ? `marquee-brand-${r.id}` : undefined}
              >
                {logo ? (
                  <img
                    src={logo}
                    alt={`${r.name} logosu`}
                    className="max-h-10 max-w-[72%] object-contain grayscale transition-all duration-500 group-hover:grayscale-0"
                    loading="lazy"
                  />
                ) : (
                  <span className="px-2 text-center text-[11px] font-bold leading-tight text-mute">{r.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
