import { motion } from "framer-motion";
import { LOGOS } from "@/data/site";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

const SOURCES = ["Trendyol", "Yemeksepeti", "Getir", "Pazarama", "Kendi Mobil Uygulaması", "Web"];
const STAGES = ["Personel Uygulaması", "Admin Panel", "Şube", "Sipariş Hazırlama"];

const Connector = ({ delay = 0 }) => (
  <div className="relative mx-auto h-12 w-px overflow-hidden bg-white/15" aria-hidden="true">
    <motion.span
      className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand"
      animate={{ top: ["-10%", "110%"] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay }}
    />
  </div>
);

const Chip = ({ children, strong = false }) => (
  <span
    className={`rounded-full px-4 py-2 text-[13px] font-semibold ${
      strong ? "bg-white text-ink" : "border border-white/15 bg-white/5 text-white/75"
    }`}
  >
    {children}
  </span>
);

export const EcosystemFlow = () => (
  <section id="ekosistem" className="grain coal-grid relative overflow-hidden bg-coal py-24 text-white md:py-36" data-testid="ecosystem-section">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        dark
        eyebrow="TEK EKOSİSTEM"
        title={
          <>
            Sipariş nereden gelirse gelsin,
            <br />
            operasyon tek noktada birleşir.
          </>
        }
        testId="ecosystem-heading"
      />

      <Reveal delay={0.15} className="mx-auto mt-16 max-w-3xl md:mt-24">
        <div className="flex flex-col items-center" data-testid="ecosystem-flow">
          <div className="flex max-w-xl flex-wrap items-center justify-center gap-2">
            {SOURCES.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <div className="flex gap-8 md:gap-14">
            <Connector delay={0} />
            <Connector delay={0.7} />
            <Connector delay={1.4} />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 rounded-full border border-white/15 bg-white px-8 py-4 shadow-[0_0_80px_rgba(var(--brand-rgb),0.15)]"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brand" />
            </span>
            <img src={LOGOS.epersonel} alt="Epersonel" className="h-6 w-auto object-contain" loading="lazy" />
          </motion.div>

          <Connector delay={0.4} />

          <div className="flex max-w-xl flex-wrap items-center justify-center gap-2">
            {STAGES.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <Connector delay={0.9} />

          <div className="flex items-center gap-3 rounded-full bg-white px-6 py-3">
            <img src={LOGOS.epkurye} alt="EPkurye" className="h-5 w-auto object-contain" loading="lazy" />
          </div>

          <Connector delay={1.3} />

          <Chip strong>Müşteri</Chip>
        </div>
      </Reveal>
    </div>
  </section>
);
