import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Smartphone, LayoutDashboard, Globe } from "lucide-react";

// EPapp hero görseli — 3 ana hizmet eksenini tek akışta anlatır:
// Pazaryeri entegrasyonları → EPapp sipariş merkezi → Personel App + Admin Panel + Markaya özel Web & Mobil.
const MARKETPLACES = ["Trendyol", "Yemeksepeti", "Getir"];

const CHANNELS = [
  { icon: Smartphone, label: "Personel App", sub: "Sipariş hazırlama" },
  { icon: LayoutDashboard, label: "Admin Panel", sub: "Operasyon kontrolü" },
  { icon: Globe, label: "Web & Mobil", sub: "Markaya özel sipariş" },
];

const ORDERS = ["#10481 · Yemeksepeti", "#10482 · Trendyol", "#10483 · Getir"];

const OrderTicker = () => {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % ORDERS.length), 2400);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <span className="relative block h-4 overflow-hidden" data-testid="epapp-flow-ticker">
      <AnimatePresence mode="wait">
        <motion.span
          key={ORDERS[i]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="block whitespace-nowrap text-[11px] font-semibold text-white/60"
        >
          {ORDERS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export const EpappFlow = () => {
  const reduce = useReducedMotion();
  const LEFT_Y = [30, 50, 70];
  const RIGHT_Y = [24, 50, 76];

  return (
    <div
      className="relative aspect-[4/4.3] overflow-hidden rounded-[2rem] border border-line bg-mist sm:aspect-[4/3.6] lg:aspect-[4/3.3]"
      data-testid="epapp-flow"
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(#101110 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        aria-hidden="true"
      />

      {/* Bağlantı çizgileri: pazaryerleri → merkez → kanallar */}
      <svg className="absolute inset-0 z-0 hidden h-full w-full md:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {LEFT_Y.map((y) => (
          <line key={`l${y}`} x1="24" y1={y} x2="42" y2="50" stroke="#101110" strokeOpacity="0.12" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        {RIGHT_Y.map((y) => (
          <line key={`r${y}`} x1="58" y1="50" x2="76" y2={y} stroke="#101110" strokeOpacity="0.12" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      {/* Akan sipariş noktaları */}
      {!reduce && (
        <>
          <motion.span
            className="absolute z-[15] hidden h-1.5 w-1.5 rounded-full bg-brand md:block"
            style={{ left: "24%", top: "30%" }}
            animate={{ left: ["24%", "42%"], top: ["30%", "50%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
            aria-hidden="true"
          />
          <motion.span
            className="absolute z-[15] hidden h-1.5 w-1.5 rounded-full bg-brand md:block"
            style={{ left: "58%", top: "50%" }}
            animate={{ left: ["58%", "76%"], top: ["50%", "24%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.8, repeatDelay: 0.6 }}
            aria-hidden="true"
          />
          <motion.span
            className="absolute z-[15] hidden h-1.5 w-1.5 rounded-full bg-brand md:block"
            style={{ left: "58%", top: "50%" }}
            animate={{ left: ["58%", "76%"], top: ["50%", "76%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.5, repeatDelay: 0.6 }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Sol: pazaryerleri */}
      <span className="absolute left-[6%] top-[10%] z-20 text-[10px] font-bold uppercase tracking-[0.16em] text-mute">
        Pazaryerleri
      </span>
      {MARKETPLACES.map((m, i) => (
        <span
          key={m}
          className="absolute z-20 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-white px-3.5 py-2 text-[11px] font-bold text-ink shadow-[0_8px_24px_rgba(16,17,16,0.07)]"
          style={{ left: "6%", top: `${LEFT_Y[i]}%` }}
          data-testid={`epapp-flow-mp-${i}`}
        >
          {m}
        </span>
      ))}

      {/* Merkez: sipariş merkezi */}
      <div
        className="absolute z-20 w-[34%] min-w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-ink px-5 py-5 text-white shadow-[0_18px_50px_rgba(16,17,16,0.25)]"
        style={{ left: "50%", top: "50%" }}
        data-testid="epapp-flow-hub"
      >
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute h-full w-full animate-ping rounded-full bg-brand" />
            <span className="h-full w-full rounded-full bg-brand" />
          </span>
          EPapp Sipariş Merkezi
        </span>
        <div className="mt-2.5">
          <OrderTicker />
        </div>
      </div>

      {/* Sağ: operasyon + markaya özel kanallar */}
      {CHANNELS.map((c, i) => (
        <div
          key={c.label}
          className="absolute z-20 flex w-[30%] min-w-[132px] -translate-y-1/2 items-center gap-2.5 rounded-2xl border border-line bg-white px-3.5 py-3 shadow-[0_10px_30px_rgba(16,17,16,0.08)]"
          style={{ left: "64%", top: `${RIGHT_Y[i]}%` }}
          data-testid={`epapp-flow-channel-${i}`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
            <c.icon className="h-4 w-4" />
          </span>
          <span>
            <span className="block whitespace-nowrap text-[11px] font-extrabold tracking-tight text-ink">{c.label}</span>
            <span className="block whitespace-nowrap text-[10px] font-semibold text-mute">{c.sub}</span>
          </span>
        </div>
      ))}
    </div>
  );
};
