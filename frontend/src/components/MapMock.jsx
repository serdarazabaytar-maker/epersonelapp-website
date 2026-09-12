import { motion } from "framer-motion";
import { Store, Bike, CheckCircle2 } from "lucide-react";

// Kuş bakışı teslimat haritası mockup — kurye rotası animasyonlu.
export const MapMock = ({ className = "" }) => (
  <div
    className={`relative overflow-hidden rounded-3xl border border-line bg-mist ${className}`}
    data-testid="map-mock"
  >
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 600 440">
      <g stroke="#E7E9E7" strokeWidth="10">
        <line x1="0" y1="110" x2="600" y2="90" />
        <line x1="0" y1="250" x2="600" y2="270" />
        <line x1="0" y1="380" x2="600" y2="370" />
        <line x1="130" y1="0" x2="150" y2="440" />
        <line x1="320" y1="0" x2="300" y2="440" />
        <line x1="480" y1="0" x2="500" y2="440" />
      </g>
      <g stroke="#EFF0EF" strokeWidth="4">
        <line x1="0" y1="60" x2="600" y2="50" />
        <line x1="0" y1="180" x2="600" y2="175" />
        <line x1="0" y1="320" x2="600" y2="330" />
        <line x1="60" y1="0" x2="70" y2="440" />
        <line x1="220" y1="0" x2="215" y2="440" />
        <line x1="400" y1="0" x2="410" y2="440" />
        <line x1="560" y1="0" x2="555" y2="440" />
      </g>
    </svg>

    {/* 3,5 km hizmet alanı */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <motion.div
        className="h-[300px] w-[300px] rounded-full border-2 border-dashed border-ink/25 bg-brand/5 md:h-[340px] md:w-[340px]"
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
    <span className="absolute right-4 top-4 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold text-ink shadow-sm">
      3,5 km hizmet alanı
    </span>

    {/* İşletme merkezi */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white shadow-xl">
        <Store className="h-6 w-6" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-2xl bg-ink/20" aria-hidden="true" />
      </span>
    </div>

    {/* Kurye rotası */}
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 600 440">
      <path d="M300 220 C 380 200, 420 260, 470 300 S 540 360, 555 385" fill="none" stroke="#101110" strokeWidth="2" strokeDasharray="6 6" opacity="0.35" />
    </svg>
    <motion.div
      className="absolute z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand shadow-[0_8px_24px_rgba(var(--brand-rgb),0.5)]"
      initial={{ left: "47%", top: "46%" }}
      animate={{ left: ["47%", "60%", "72%", "88%"], top: ["46%", "55%", "64%", "84%"] }}
      transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      aria-hidden="true"
    >
      <Bike className="h-4 w-4 text-ink" />
    </motion.div>

    {/* Teslimat kartları */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="absolute bottom-4 left-4 rounded-2xl border border-line bg-white p-3.5 shadow-lg"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">
          <Bike className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-extrabold text-ink">Sipariş #2413 yolda</p>
          <p className="text-[11px] text-mute">Tahmini varış: 12 dk</p>
        </div>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
      className="absolute right-4 top-14 hidden rounded-2xl border border-line bg-white p-3.5 shadow-lg md:block"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-ink">
          <CheckCircle2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-extrabold text-ink">Sipariş #2409 teslim edildi</p>
          <p className="text-[11px] text-mute">28 dakikada kapıda</p>
        </div>
      </div>
    </motion.div>
  </div>
);
