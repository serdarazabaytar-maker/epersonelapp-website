import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { LogoBand } from "@/components/LogoBand";
import { DashboardMock } from "@/components/DashboardMock";
import { SystemVisual } from "@/components/SystemVisual";
import { EcosystemFlow } from "@/components/EcosystemFlow";
import { CaseCards } from "@/components/CaseCards";
import { SOLUTIONS, METRICS } from "@/data/site";

const HERO_TABS = [
  {
    id: "ep",
    name: "EP",
    title: "Küçük işletmenizi pazaryerlerine taşıyın.",
    desc: "Market, kasap, manav, şarküteri, petshop ve su bayii işletmelerinizi dijital satış kanallarında satışa hazır hale getirin.",
    visual: "phone-ep",
  },
  {
    id: "epapp",
    name: "EPapp",
    title: "Tüm satış kanallarınızı tek altyapıda birleştirin.",
    desc: "Pazaryeri entegrasyonları, personel sipariş uygulaması ve markanıza özel mobil & web sipariş sistemi.",
    visual: "dashboard",
  },
  {
    id: "epfood",
    name: "EPfood",
    title: "Restoranınızın dijital sipariş operasyonunu kurun.",
    desc: "Panel kurulumu, menü, ürün seçenekleri, görseller, sipariş yönetimi ve teslimat.",
    visual: "phone-epfood",
  },
  {
    id: "epkurye",
    name: "EPkurye",
    title: "Siparişten kapıya kadar teslimatı yönetin.",
    desc: "30–45 dakika hemen teslim, randevulu teslim, moto kurye ve frigolu panelvan çözümleri.",
    visual: "map",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 70]);

  useEffect(() => {
    if (paused || reduce) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % HERO_TABS.length), 4800);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const select = (i) => {
    setActive(i);
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 16000);
  };

  const tab = HERO_TABS[active];

  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44" data-testid="hero-section">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute"
            data-testid="hero-eyebrow"
          >
            <span className="inline-block h-2 w-2 rounded-[3px] bg-brand" aria-hidden="true" />
            Epersonel Dijital Satış Çözümleri
          </motion.p>

          <h1 className="mt-6 text-[42px] font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl" data-testid="hero-title">
            {["İşletmenize uygun", "dijital satış", "altyapısı."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-mute md:text-lg"
            data-testid="hero-subtitle"
          >
            Pazaryerlerinden kendi sipariş kanalınıza, sipariş yönetiminden teslimata kadar işletmenizin ihtiyacına
            uygun teknoloji ve operasyon çözümleri.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <CTAButton href="#cozumler" testId="hero-cta-explore">
              Çözümleri Keşfet
            </CTAButton>
            <CTAButton to="/iletisim" variant="ghost" testId="hero-cta-meeting">
              Görüşme Planla
            </CTAButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={reduce ? undefined : { y: parallaxY }}
        >
          <div className="rounded-[2rem] border border-line bg-mist p-4 sm:p-6" data-testid="hero-tabs-panel">
            <div className="flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Çözümler">
              {HERO_TABS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active === i}
                  data-testid={`hero-tab-${t.id}`}
                  onClick={() => select(i)}
                  className={`relative shrink-0 overflow-hidden rounded-full px-4 py-2 text-[13px] font-bold transition-colors duration-300 ${
                    active === i ? "bg-ink text-white" : "bg-white text-mute hover:text-ink border border-line"
                  }`}
                >
                  {t.name}
                  {active === i && !paused && !reduce && (
                    <motion.span
                      key={`progress-${active}`}
                      className="absolute bottom-0 left-0 h-[3px] bg-brand"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.8, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5"
                data-testid={`hero-panel-${tab.id}`}
              >
                <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">{tab.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mute">{tab.desc}</p>
                <div className="mt-5 h-[340px] sm:h-[380px]">
                  <SystemVisual variant={tab.id} fill />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Solutions = () => (
  <section id="cozumler" className="scroll-mt-24 py-24 md:py-32" data-testid="solutions-section">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="ÇÖZÜMLER"
        title="Her işletmenin ihtiyacı aynı değil."
        desc="Bu yüzden Epersonel tek bir ürün yerine işletmenizin yapısına uygun çözümler sunar."
        testId="solutions-heading"
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.id} delay={(i % 2) * 0.1}>
            <Link
              to={s.path}
              data-testid={`solution-card-${s.id}`}
              {...(s.id === "epfood" ? { "data-accent": "food" } : {})}
              className="group flex h-full flex-col rounded-[2rem] border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:shadow-[0_24px_70px_rgba(16,17,16,0.1)] md:p-10"
            >
              <div className="flex items-start justify-between">
                <img src={s.logo} alt={`${s.name} logosu`} className="h-8 w-auto object-contain object-left" loading="lazy" />
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
              <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-mute">{s.label}</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">{s.title}</h3>
              {s.desc && <p className="mt-3 text-[15px] leading-relaxed text-mute">{s.desc}</p>}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line bg-mist px-3 py-1 text-[11px] font-bold text-ink">
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-8 inline-flex items-center gap-2 pt-2 text-[15px] font-bold text-ink">
                {s.cta}
                <span className="h-[3px] w-6 rounded-full bg-brand transition-all duration-300 group-hover:w-10" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const SHOWCASE_TABS = [
  { key: "siparisler", label: "Siparişler" },
  { key: "urunler", label: "Ürünler" },
  { key: "stok", label: "Stok" },
  { key: "fiyat", label: "Fiyat" },
  { key: "personel", label: "Personel" },
  { key: "subeler", label: "Şubeler" },
];

const ProductShowcase = () => {
  const [tab, setTab] = useState("siparisler");
  return (
    <section id="urun" className="scroll-mt-24 bg-mist py-24 md:py-32" data-testid="showcase-section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="ÜRÜNÜ GÖRÜN"
          title={
            <>
              Sadece anlatmıyoruz.
              <br />
              Operasyonu gerçekten yönetiyoruz.
            </>
          }
          testId="showcase-heading"
        />
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-1.5" role="tablist" aria-label="Panel bölümleri">
            {SHOWCASE_TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                data-testid={`showcase-tab-${t.key}`}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300 ${
                  tab === t.key ? "bg-ink text-white" : "border border-line bg-white text-mute hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mt-6">
          <DashboardMock tab={tab} />
        </Reveal>
      </div>
    </section>
  );
};

const Counter = ({ to, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

const Metrics = () => (
  <section className="border-b border-line py-20 md:py-28" data-testid="metrics-section">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-5 md:grid-cols-4 md:px-8">
      {METRICS.map((m, i) => (
        <Reveal key={m.label} delay={i * 0.08}>
          <div data-testid={`metric-${i}`}>
            <p className="text-5xl font-extrabold tracking-tight text-ink md:text-6xl">
              {m.value === null ? <span className="text-line">—</span> : <Counter to={m.value} suffix={m.suffix} />}
            </p>
            <p className="mt-3 text-sm font-semibold text-mute">{m.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const WHY = [
  { n: "01", title: "Tek Noktadan Yönetim", desc: "Satış, sipariş ve teslimat süreçlerini tek merkezden yönetin." },
  { n: "02", title: "Teknoloji + Operasyon", desc: "Sadece yazılım değil, operasyon desteği de sunuyoruz." },
  { n: "03", title: "Esnek ve Ölçeklenebilir", desc: "Tek şubeden çok şubeli yapılara kadar ihtiyaca göre ölçeklenir." },
  { n: "04", title: "Sürekli Takip", desc: "Sistem ve operasyon süreçleri takip edilir ve geliştirilir." },
];

const Why = () => (
  <section className="py-24 md:py-32" data-testid="why-section">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead eyebrow="NEDEN EPERSONEL" title="Neden Epersonel?" testId="why-heading" />
      <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
        {WHY.map((w, i) => (
          <Reveal key={w.n} delay={(i % 2) * 0.1}>
            <div className="border-t-2 border-ink pt-8" data-testid={`why-item-${i}`}>
              <span className="text-6xl font-extrabold tracking-tight text-transparent md:text-7xl" style={{ WebkitTextStroke: "1.5px #101110" }}>
                {w.n}
              </span>
              <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink md:text-3xl">{w.title}</h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-mute md:text-lg">{w.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Cases = () => (
  <section className="bg-mist py-24 md:py-32" data-testid="cases-section">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <SectionHead
          eyebrow="REFERANSLAR"
          title="Bize güvenen markalar."
          testId="cases-heading"
        />
        <Reveal delay={0.1}>
          <CTAButton to="/referanslar" variant="ghost" testId="cases-all-link">
            Tüm Referanslar
          </CTAButton>
        </Reveal>
      </div>
      <div className="mt-14">
        <CaseCards limit={3} />
      </div>
    </div>
  </section>
);

const BigCTA = () => (
  <section className="py-24 md:py-36" data-testid="home-final-cta">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-white p-10 md:p-20">
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
            <span className="inline-block h-2 w-2 rounded-[3px] bg-brand" aria-hidden="true" />
            Nereden başlayacağınızdan emin değil misiniz?
          </p>
          <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            İhtiyacınızı anlatın, doğru çözümü birlikte bulalım.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg">
            İşletmenizin yapısını dinliyor, satış kanallarınızı ve operasyonunuzu analiz ediyor, size en uygun
            teknoloji + operasyon modelini birlikte belirliyoruz.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CTAButton to="/iletisim" testId="home-cta-meeting">
              Görüşme Planla
            </CTAButton>
            <CTAButton to="/iletisim" variant="dark" testId="home-cta-contact">
              Bize Ulaşın
            </CTAButton>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <>
      <Seo
        title="Epersonel — Dijital Satış ve Operasyon Çözümleri"
        siteName="Epersonel"
        description="Pazaryerlerinden kendi sipariş kanalınıza, sipariş yönetiminden teslimata kadar işletmenizin ihtiyacına uygun teknoloji ve operasyon çözümleri."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Epersonel",
          url: typeof window !== "undefined" ? window.location.origin : undefined,
          description: "Dijital satış kanalları kuran, sipariş operasyonlarını yöneten ve teslimat üstlenen teknoloji + operasyon şirketi.",
          brand: [
            { "@type": "Brand", name: "EP" },
            { "@type": "Brand", name: "EPapp" },
            { "@type": "Brand", name: "EPkurye" },
            { "@type": "Brand", name: "EPfood" },
          ],
        }}
      />
      <Hero />
      <LogoBand />
      <Solutions />
      <EcosystemFlow />
      <ProductShowcase />
      <Metrics />
      <Why />
      <Cases />
      <BigCTA />
    </>
  );
}
