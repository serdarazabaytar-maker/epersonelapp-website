import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Barcode, Lock, Bike, Store, Home } from "lucide-react";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

// "4 adımda işletmenizi e-ticarete taşıyın" — tek akışın 4 adımı.
// Otomatik döner + manuel seçim; sahne kabuğu sabit, içerik yumuşakça değişir.
const STEPS = [
  {
    key: "entegrasyon",
    num: "01",
    short: "Entegre et",
    title: "Pazaryerleri stok & fiyat entegrasyonu",
    desc: "Ürünleriniz desteklenen pazaryerlerine bağlanır; stok ve fiyat tek merkezden canlı yönetilir.",
    features: ["Ürün & barkod eşleme", "Canlı stok senkronu", "Merkezi fiyat yönetimi", "Pazaryeri bağlantıları"],
  },
  {
    key: "siparis",
    num: "02",
    short: "Sipariş al",
    title: "Web & mobil firmaya özel sipariş uygulaması",
    desc: "Markanıza özel mobil uygulama ve web sipariş ekranı ile komisyonsuz kendi kanalınızdan sipariş alın.",
    features: ["Markanıza özel mobil uygulama", "Web sipariş ekranı", "Kampanya & banner alanları", "Sepet ve online ödeme akışı"],
  },
  {
    key: "hazirla",
    num: "03",
    short: "Hazırla",
    title: "Personel sipariş hazırlama uygulaması ve admin panel",
    desc: "Gelen sipariş personelin ekranına düşer; tüm operasyon admin panelinden anlık kontrol edilir.",
    features: ["Sipariş hazırlama ekranı", "Personel uygulaması", "Admin panel kontrolü", "Anlık sipariş durumu"],
  },
  {
    key: "teslim",
    num: "04",
    short: "Teslim et",
    title: "Kurye teslimatı — siparişin müşteriye ulaşması",
    desc: "Hazır sipariş kuryeye aktarılır; rota ve teslimat müşteriye kadar canlı takip edilir.",
    features: ["Mağazadan kuryeye aktarım", "Rota & canlı takip", "Müşteriye teslim"],
  },
];

const MarketplaceChips = () => (
  <div className="flex flex-wrap gap-1.5">
    {["Trendyol", "Yemeksepeti", "Getir"].map((m) => (
      <span key={m} className="rounded-full border border-line bg-white px-3 py-1 text-[10px] font-bold text-ink">
        {m}
      </span>
    ))}
    <span className="flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-[10px] font-bold text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" /> Bağlı
    </span>
  </div>
);

const VisualIntegrate = () => (
  <>
    <MarketplaceChips />
    <div className="mt-3 space-y-2">
      {[
        ["Dana Kıyma 500g", "Stok: 42", "₺389,90"],
        ["Süzme Yoğurt 1kg", "Stok: 18", "₺74,99"],
      ].map(([n, s, f]) => (
        <div key={n} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-3.5 py-3">
          <span className="text-xs font-bold text-ink">{n}</span>
          <span className="flex items-center gap-2">
            <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold text-mute">{s}</span>
            <span className="text-xs font-extrabold text-ink">{f}</span>
          </span>
        </div>
      ))}
    </div>
    <div className="mt-3 flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2.5 text-[11px] font-bold text-white">
      <Barcode className="h-4 w-4" /> Barkod ile ürün eşleme aktif
    </div>
  </>
);

const VisualShop = () => (
  <>
    <div className="rounded-xl border border-line bg-white">
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5">
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
        </span>
        <span className="rounded-full bg-mist px-3 py-1 text-[10px] font-bold text-mute">markaniz.com</span>
      </div>
      <div className="p-3">
        <div className="flex h-14 items-center rounded-lg bg-brand/15 px-3.5 text-[11px] font-bold text-ink">
          Kampanya bannerı
        </div>
        <div className="mt-2.5 space-y-2">
          {["Izgara Köfte Menü", "Ev Yapımı Limonata"].map((p) => (
            <div key={p} className="flex items-center justify-between rounded-lg border border-line px-3 py-2">
              <span className="text-[11px] font-bold text-ink">{p}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">+</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-3 flex gap-2">
      <span className="flex-1 rounded-xl border border-line bg-white px-3.5 py-2.5 text-center text-[11px] font-bold text-ink">
        Sepet · 2 ürün
      </span>
      <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand px-3.5 py-2.5 text-[11px] font-bold text-ink">
        <Lock className="h-3.5 w-3.5" /> Online Ödeme
      </span>
    </div>
  </>
);

const VisualOps = () => (
  <div className="grid grid-cols-2 gap-3">
    <div className="rounded-xl border border-line bg-white p-3.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mute">Personel App</p>
      <p className="mt-2 text-xs font-extrabold text-ink">Sipariş #10481</p>
      <div className="mt-2.5 space-y-1.5">
        {["Yeni", "Hazırlanıyor", "Hazır"].map((s, i) => (
          <span
            key={s}
            className={`block rounded-full px-2.5 py-1 text-center text-[10px] font-bold ${
              i === 1 ? "bg-brand text-ink" : "bg-mist text-mute"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
    <div className="rounded-xl border border-line bg-white p-3.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-mute">Admin Panel</p>
      <div className="mt-2.5 space-y-2.5">
        {[
          ["Bekleyen", "4", "w-2/5"],
          ["Hazırlanan", "2", "w-1/4"],
          ["Teslimde", "3", "w-1/3"],
        ].map(([l, v, w]) => (
          <div key={l}>
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-mute">{l}</span>
              <span className="text-ink">{v}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-mist">
              <div className={`h-full rounded-full bg-ink ${w}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VisualDeliver = () => (
  <div className="relative h-44 overflow-hidden rounded-xl border border-line bg-white">
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M22 55 C 40 45, 55 62, 78 40" fill="none" stroke="#101110" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" vectorEffect="non-scaling-stroke" />
    </svg>
    <span className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-ink text-white" style={{ left: "22%", top: "55%" }}>
      <Store className="h-4 w-4" />
    </span>
    <span className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-white" style={{ left: "78%", top: "40%" }}>
      <Home className="h-4 w-4 text-ink" />
    </span>
    <motion.span
      className="absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand shadow"
      animate={{ left: ["22%", "45%", "78%"], top: ["55%", "50%", "40%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
      aria-hidden="true"
    >
      <Bike className="h-3.5 w-3.5 text-ink" />
    </motion.span>
    <span className="absolute bottom-3 left-3 rounded-full border border-line bg-white px-3 py-1.5 text-[10px] font-bold text-ink shadow-sm">
      Canlı Takip
    </span>
  </div>
);

const VISUALS = { entegrasyon: VisualIntegrate, siparis: VisualShop, hazirla: VisualOps, teslim: VisualDeliver };

export const StepsShowcase = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 5200);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const select = (i) => {
    setActive(i);
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 16000);
  };

  const step = STEPS[active];
  const Visual = VISUALS[step.key];

  return (
    <section id="adimlar" className="scroll-mt-24 bg-mist py-24 md:py-32" data-testid="steps-section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="NASIL ÇALIŞIR"
          title="4 adımda işletmenizi e-ticarete taşıyın."
          desc="Pazaryeri entegrasyonundan markanıza özel sipariş kanalına, personel operasyonundan teslimata kadar tüm süreci tek sistemde yönetin."
          testId="steps-heading"
        />
        <Reveal delay={0.05}>
          <p className="mt-5 text-sm font-bold tracking-wide text-ink" data-testid="steps-flow">
            Entegre et <span className="text-mute">→</span> Sipariş al <span className="text-mute">→</span> Hazırla{" "}
            <span className="text-mute">→</span> Teslim et
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Adımlar">
            {STEPS.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={active === i}
                data-testid={`step-tab-${i}`}
                onClick={() => select(i)}
                className={`relative shrink-0 overflow-hidden rounded-full px-4 py-2 text-[13px] font-bold transition-colors duration-300 ${
                  active === i ? "bg-ink text-white" : "border border-line bg-white text-mute hover:text-ink"
                }`}
              >
                <span className="mr-1.5 text-[11px] opacity-60">{s.num}</span>
                {s.short}
                {active === i && !paused && !reduce && (
                  <motion.span
                    key={`step-progress-${active}`}
                    className="absolute bottom-0 left-0 h-[3px] bg-brand"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5.2, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 rounded-[2rem] border border-line bg-white p-8 md:p-12" data-testid="steps-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-center gap-10 lg:grid-cols-2"
              >
                <div>
                  <span className="text-5xl font-extrabold tracking-tight text-transparent md:text-6xl" style={{ WebkitTextStroke: "1.5px #101110" }}>
                    {step.num}
                  </span>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink md:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mute">{step.desc}</p>
                  <ul className="mt-6 space-y-2.5">
                    {step.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm font-semibold text-ink">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-line bg-mist p-4 sm:p-5" data-testid={`steps-visual-${step.key}`}>
                  <Visual />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
