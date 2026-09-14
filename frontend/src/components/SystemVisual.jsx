import { motion, useReducedMotion } from "framer-motion";
import { PhoneMock } from "./PhoneMock";
import { DashboardMock } from "./DashboardMock";
import { MapMock } from "./MapMock";

// 4 çözüm için ortak "sistem + operasyon" görsel dili.
// Merkezde ürün mockup'ı, çevresinde ince bağlantı çizgileriyle merkeze bağlanan
// floating sistem kartları. Kart metinleri sistem yeteneklerini anlatır; veri değildir.
const VARIANTS = {
  ep: {
    center: "phone-ep",
    hub: { x: 50, y: 44 },
    cards: [
      { label: "Ürün", sub: "Katalog", x: 11, y: 13 },
      { label: "Stok", sub: "Canlı", x: 8, y: 45 },
      { label: "Fiyat", sub: "Merkezi", x: 13, y: 77 },
      { label: "Kampanya", sub: "Talep", x: 87, y: 15 },
      { label: "Pazaryeri", sub: "Çok kanal", x: 89, y: 47 },
      { label: "Barkod", sub: "Hızlı bul", x: 85, y: 79 },
    ],
  },
  epapp: {
    center: "dashboard",
    hub: { x: 50, y: 50 },
    cards: [
      { label: "Şubeler", sub: "Çoklu", x: 8, y: 11 },
      { label: "Personel", sub: "Tek app", x: 5, y: 39 },
      { label: "Entegrasyon", sub: "Çok kanal", x: 8, y: 67 },
      { label: "Stok", sub: "Saatlik", x: 13, y: 90 },
      { label: "Fiyat", sub: "Kurallı", x: 89, y: 11 },
      { label: "Web", sub: "Sipariş", x: 93, y: 38 },
      { label: "Mobil App", sub: "Markaya özel", x: 90, y: 65 },
      { label: "Raporlama", sub: "Canlı", x: 84, y: 89 },
    ],
  },
  epfood: {
    center: "phone-epfood",
    hub: { x: 50, y: 44 },
    cards: [
      { label: "Menü", sub: "Yapı", x: 11, y: 13 },
      { label: "Opsiyon", sub: "Seçimler", x: 8, y: 45 },
      { label: "Ekstra", sub: "Ücretli", x: 13, y: 77 },
      { label: "Görsel", sub: "Satışa hazır", x: 87, y: 15 },
      { label: "Sipariş", sub: "Tek ekran", x: 89, y: 47 },
      { label: "Kurye", sub: "Entegre", x: 85, y: 79 },
    ],
  },
  epgo: {
    center: "map",
    hub: { x: 50, y: 50 },
    cards: [
      { label: "30–45 dk", sub: "Hemen teslim", x: 10, y: 12 },
      { label: "3,5 km", sub: "Kapsama", x: 7, y: 44 },
      { label: "Randevulu", sub: "Planlı", x: 9, y: 86 },
      { label: "Moto Kurye", sub: "Hızlı", x: 88, y: 14 },
      { label: "Frigolu", sub: "Soğuk zincir", x: 90, y: 46 },
      { label: "Canlı Takip", sub: "Rota", x: 85, y: 78 },
    ],
  },
};

const Center = ({ center }) => {
  if (center === "dashboard") {
    return (
      <>
        <div className="absolute left-1/2 top-1/2 z-10 w-[72%] -translate-x-1/2 -translate-y-1/2">
          <DashboardMock tab="siparisler" compact />
        </div>
        <div className="absolute -bottom-[4%] right-[9%] z-20 hidden origin-bottom-right scale-[0.42] sm:block" aria-hidden="true">
          <PhoneMock variant="personel" />
        </div>
      </>
    );
  }
  if (center === "map") {
    return (
      <div className="absolute left-1/2 top-1/2 z-10 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2">
        <MapMock className="h-full w-full" />
      </div>
    );
  }
  const variant = center === "phone-epfood" ? "epfood" : "ep";
  return (
    <>
      <div className="absolute left-1/2 top-[5%] z-10 -translate-x-1/2">
        <div className="origin-top scale-[0.68] sm:scale-[0.78] lg:scale-[0.84]">
          <PhoneMock variant={variant} />
        </div>
      </div>
      {center === "phone-ep" && (
        <div className="absolute bottom-[6%] left-[7%] z-20 hidden sm:block" aria-hidden="true">
          <div className="relative h-10 w-12 rounded-lg border-2 border-ink/15 bg-white">
            <div className="absolute -top-2 left-1/2 h-2.5 w-6 -translate-x-1/2 rounded-t-md border-2 border-b-0 border-ink/15" />
            <div className="absolute inset-x-2.5 top-2.5 flex justify-between">
              <span className="h-4 w-0.5 rounded bg-ink/10" />
              <span className="h-4 w-0.5 rounded bg-ink/10" />
              <span className="h-4 w-0.5 rounded bg-ink/10" />
            </div>
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-brand" />
          </div>
        </div>
      )}
      {center === "phone-epfood" && (
        <div className="absolute bottom-[6%] left-[6%] z-20 hidden gap-2 sm:flex" aria-hidden="true">
          {[
            ["B", "from-amber-200 to-orange-300"],
            ["P", "from-orange-200 to-amber-300"],
            ["İ", "from-amber-100 to-orange-200"],
          ].map(([l, g]) => (
            <span
              key={l}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-gradient-to-br text-xs font-extrabold text-ink shadow-sm ${g}`}
            >
              {l}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export const SystemVisual = ({ variant = "ep", fill = false }) => {
  const cfg = VARIANTS[variant] || VARIANTS.ep;
  const reduce = useReducedMotion();

  return (
    <div
      className={
        fill
          ? "relative h-full w-full overflow-hidden rounded-[1.4rem] border border-line bg-mist"
          : "relative aspect-[4/4.3] overflow-hidden rounded-[2rem] border border-line bg-mist sm:aspect-[4/3.6] lg:aspect-[4/3.3]"
      }
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
            x2={cfg.hub.x}
            y2={cfg.hub.y}
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
              left: [`${c.x}%`, `${cfg.hub.x}%`],
              top: [`${c.y}%`, `${cfg.hub.y}%`],
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
