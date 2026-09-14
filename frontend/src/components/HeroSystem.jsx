import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LOGOS } from "@/data/site";

// Ana sayfa hero görseli — TEK sabit sistem sahnesi.
// Çözüm değişince sahne yeniden kurulmaz; merkez hub, bağlantı çizgileri ve slotlar
// sabit kalır, yalnızca modül kartları yerinde yumuşakça değişir.
const HUB = { x: 50, y: 44 };

const SLOTS = [
  { x: 15, y: 18 },
  { x: 9, y: 56 },
  { x: 85, y: 18 },
  { x: 91, y: 56 },
  { x: 50, y: 87 },
];

const MODULES = {
  ep: [
    { label: "Ürün", sub: "Katalog" },
    { label: "Stok", sub: "Canlı" },
    { label: "Pazaryeri", sub: "Çok kanal" },
    { label: "Fiyat", sub: "Merkezi" },
    { label: "Barkod", sub: "Hızlı eşleme" },
  ],
  epapp: [
    { label: "Pazaryeri", sub: "Entegrasyon" },
    { label: "Personel App", sub: "Sipariş hazırlama" },
    { label: "Web & Mobil", sub: "Markaya özel sipariş" },
    { label: "Admin Panel", sub: "Operasyon kontrolü" },
  ],
  epfood: [
    { label: "Menü", sub: "Yapı" },
    { label: "Opsiyon", sub: "Seçimler" },
    { label: "Sipariş", sub: "Tek ekran" },
    { label: "Ürün Görseli", sub: "Satışa hazır" },
    { label: "Restoran", sub: "Operasyon" },
  ],
  epgo: [
    { label: "Rota", sub: "Canlı" },
    { label: "Kurye", sub: "Moto + Araç" },
    { label: "Teslimat", sub: "30–45 dk" },
    { label: "Müşteri", sub: "Takip" },
    { label: "Kapsama", sub: "3,5 km" },
  ],
};

const ModuleCard = ({ m }) => (
  <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-[0_10px_30px_rgba(16,17,16,0.08)]">
    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
    <span>
      <span className="block whitespace-nowrap text-xs font-extrabold tracking-tight text-ink">{m.label}</span>
      <span className="block whitespace-nowrap text-[10px] font-semibold text-mute">{m.sub}</span>
    </span>
  </div>
);

export const HeroSystem = ({ variant = "ep" }) => {
  const reduce = useReducedMotion();
  const modules = MODULES[variant] || MODULES.ep;
  const slots = SLOTS.slice(0, modules.length);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[1.4rem] border border-line bg-mist"
      data-testid={`hero-system-${variant}`}
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(#101110 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        aria-hidden="true"
      />

      {/* Sabit bağlantı çizgileri — aktif modül slotlarına göre yumuşakça belirir */}
      <svg
        className="absolute inset-0 z-0 hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <AnimatePresence>
          {slots.map((s, i) => (
            <motion.line
              key={`${variant}-line-${i}`}
              x1={s.x}
              y1={s.y}
              x2={HUB.x}
              y2={HUB.y}
              stroke="#101110"
              strokeOpacity="0.12"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Akan veri noktaları — slot → hub, sürekli akış */}
      {!reduce &&
        slots.slice(0, 3).map((s, i) => (
          <motion.span
            key={`${variant}-dot-${i}`}
            className="absolute z-[15] hidden h-1.5 w-1.5 rounded-full bg-brand md:block"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            animate={{
              left: [`${s.x}%`, `${HUB.x}%`],
              top: [`${s.y}%`, `${HUB.y}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.7, repeatDelay: 1 }}
            aria-hidden="true"
          />
        ))}

      {/* Merkez hub — her çözümde sabit */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        data-testid="hero-system-hub"
      >
        <div className="relative flex flex-col items-center gap-2.5 rounded-3xl border border-line bg-white px-7 py-5 shadow-[0_18px_50px_rgba(16,17,16,0.1)]">
          <span
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-brand/20 blur-xl"
            aria-hidden="true"
          />
          <img src={LOGOS.epersonel} alt="Epersonel" className="h-6 w-auto object-contain" />
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-mute">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute h-full w-full animate-ping rounded-full bg-brand" />
              <span className="h-full w-full rounded-full bg-brand" />
            </span>
            Tek sistem · Canlı
          </span>
        </div>
      </div>

      {/* Modül kartları — çözüm değişince yerinde yumuşak geçiş */}
      {slots.map((s, i) => (
        <div
          key={`slot-${i}`}
          className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 ${i < 3 ? "" : "hidden md:block"}`}
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          data-testid={`hero-module-${i}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${variant}-${i}`}
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 4 + (i % 3) * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              >
                <ModuleCard m={modules[i]} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
