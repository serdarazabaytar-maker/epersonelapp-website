import { motion, useReducedMotion } from "framer-motion";
import { Store, Bike, Car, Home, Clock3, Snowflake, CalendarClock } from "lucide-react";

// EPgo hero görseli — tek sade sahne:
// 1 mağaza (merkez), 3,5 km kapsama alanı, 2 müşteri noktası;
// birine moto kurye, diğerine araçlı (frigolu) kurye gider.
export const EpgoMap = () => {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative aspect-[4/4.3] overflow-hidden rounded-[2rem] border border-line bg-mist sm:aspect-[4/3.6] lg:aspect-[4/3.3]"
      data-testid="epgo-map"
    >
      {/* Sade yol ızgarası */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g stroke="#EBEDEB" strokeWidth="3">
          <line x1="0" y1="33" x2="100" y2="31" />
          <line x1="0" y1="68" x2="100" y2="71" />
          <line x1="33" y1="0" x2="31" y2="100" />
          <line x1="70" y1="0" x2="72" y2="100" />
        </g>
      </svg>

      {/* Kapsama alanı */}
      <div className="absolute left-[52%] top-[50%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <motion.div
          className="h-[280px] w-[280px] rounded-full border-2 border-dashed border-ink/20 bg-brand/5 md:h-[320px] md:w-[320px]"
          initial={{ scale: 0.75, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="absolute right-4 top-4 z-20 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold text-ink shadow-sm">
        3,5 km kapsama
      </span>

      {/* Rota çizgileri */}
      <svg className="absolute inset-0 z-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M52 50 C 62 42, 72 32, 84 24" fill="none" stroke="#101110" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.3" vectorEffect="non-scaling-stroke" />
        <path d="M52 50 C 44 60, 32 70, 20 78" fill="none" stroke="#101110" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.3" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Mağaza (merkez) */}
      <div className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: "52%", top: "50%" }}>
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white shadow-xl">
          <Store className="h-5 w-5" />
          <span className="absolute inset-0 -z-10 animate-ping rounded-2xl bg-ink/20" aria-hidden="true" />
        </span>
        <span className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-bold text-ink shadow-sm">Mağaza</span>
      </div>

      {/* Müşteri A — moto kurye */}
      <div className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: "84%", top: "24%" }} data-testid="epgo-map-customer-a">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white shadow-md">
          <Home className="h-4 w-4 text-ink" />
        </span>
        <span className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-bold text-ink shadow-sm">Müşteri</span>
      </div>

      {/* Müşteri B — araçlı kurye */}
      <div className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5" style={{ left: "20%", top: "78%" }} data-testid="epgo-map-customer-b">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white shadow-md">
          <Home className="h-4 w-4 text-ink" />
        </span>
        <span className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-bold text-ink shadow-sm">Müşteri</span>
      </div>

      {/* Moto kurye — müşteri A'ya */}
      <motion.span
        className="absolute z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand shadow-[0_8px_24px_rgba(var(--brand-rgb),0.5)]"
        animate={reduce ? undefined : { left: ["52%", "64%", "76%", "84%"], top: ["50%", "42%", "32%", "24%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        style={{ left: "52%", top: "50%" }}
        aria-hidden="true"
      >
        <Bike className="h-4 w-4 text-ink" />
      </motion.span>

      {/* Araçlı kurye — müşteri B'ye */}
      <motion.span
        className="absolute z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink shadow-lg"
        animate={reduce ? undefined : { left: ["52%", "44%", "30%", "20%"], top: ["50%", "60%", "70%", "78%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.8, repeatDelay: 1 }}
        style={{ left: "52%", top: "50%" }}
        aria-hidden="true"
      >
        <Car className="h-4 w-4 text-white" />
      </motion.span>

      {/* Teslimat modeli etiketleri */}
      <span className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[10px] font-bold text-ink shadow-sm">
        <Clock3 className="h-3.5 w-3.5 text-mute" /> 30–45 dakika hemen teslim
      </span>
      <span className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[10px] font-bold text-ink shadow-sm">
        <Snowflake className="h-3.5 w-3.5 text-mute" /> Frigolu teslim
      </span>
      <span className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1.5 text-[10px] font-bold text-ink shadow-sm">
        <CalendarClock className="h-3.5 w-3.5 text-mute" /> Randevulu teslim
      </span>
    </div>
  );
};
