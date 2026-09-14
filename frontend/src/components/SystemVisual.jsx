import { motion, useReducedMotion } from "framer-motion";
import { PhoneMock } from "./PhoneMock";

// Hero "sistem görseli" — merkezde ürün mockup'ı, çevresinde yüzen sistem kartları.
// Yalnızca EP ve EPfood çözüm sayfaları kullanır (EPapp → EpappFlow, EPgo → EpgoMap).
const VARIANTS = {
  ep: {
    center: "phone-ep",
    cards: [
      { label: "Stok", sub: "Canlı", x: 10, y: 20 },
      { label: "Fiyat", sub: "Merkezi", x: 88, y: 18 },
      { label: "Ürün", sub: "Katalog", x: 6, y: 62 },
      { label: "Barkod", sub: "Hızlı bul", x: 92, y: 58 },
      { label: "Tek panel", sub: "Tüm kanallar", x: 24, y: 88 },
      { label: "Pazaryeri", sub: "Entegrasyon", x: 76, y: 86 },
    ],
  },
  epfood: {
    center: "phone-food",
    cards: [
      { label: "Menü", sub: "Yapı", x: 10, y: 20 },
      { label: "Opsiyon", sub: "Seçimler", x: 88, y: 18 },
      { label: "Sipariş", sub: "Tek ekran", x: 6, y: 62 },
      { label: "Ürün Görseli", sub: "Satışa hazır", x: 92, y: 58 },
      { label: "Mutfak", sub: "Operasyon", x: 24, y: 88 },
      { label: "Rapor", sub: "Anlık", x: 76, y: 86 },
    ],
  },
};

const Center = ({ center }) => (
  <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
    <PhoneMock variant={center === "phone-ep" ? "ep" : "epfood"} className="scale-[0.92] sm:scale-100" />
  </div>
);

export const SystemVisual = ({ variant = "ep" }) => {
  const cfg = VARIANTS[variant] || VARIANTS.ep;
  const reduce = useReducedMotion();

  return (
    <div
      className="relative aspect-[4/4.3] overflow-hidden rounded-[2rem] border border-line bg-mist sm:aspect-[4/3.6] lg:aspect-[4/3.3]"
      data-testid={`system-visual-${variant}`}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(#101110 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        aria-hidden="true"
      />

      {/* Bağlantı çizgileri */}
      <svg
        className="absolute inset-0 z-0 hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {cfg.cards.map((c) => (
          <line
            key={c.label}
            x1={c.x}
            y1={c.y}
            x2="50"
            y2="50"
            stroke="#101110"
            strokeOpacity="0.12"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Akan veri noktaları */}
      {!reduce &&
        cfg.cards.map((c, i) => (
          <motion.span
            key={`dot-${c.label}`}
            className="absolute z-[15] hidden h-1.5 w-1.5 rounded-full bg-brand md:block"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            animate={{
              left: [`${c.x}%`, "50%"],
              top: [`${c.y}%`, "50%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.45, repeatDelay: 0.8 }}
            aria-hidden="true"
          />
        ))}

      <Center center={cfg.center} />

      {/* Floating sistem kartları */}
      {cfg.cards.map((c, i) => (
        <div
          key={c.label}
          className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 ${i < 2 ? "" : "hidden md:block"}`}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          data-testid={`system-card-${variant}-${i}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 3.6 + (i % 3) * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
              className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-[0_10px_30px_rgba(16,17,16,0.08)]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              <span>
                <span className="block whitespace-nowrap text-xs font-extrabold tracking-tight text-ink">{c.label}</span>
                {c.sub && <span className="block whitespace-nowrap text-[10px] font-semibold text-mute">{c.sub}</span>}
              </span>
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
