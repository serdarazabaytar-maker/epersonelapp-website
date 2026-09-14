import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { LogoBand } from "@/components/LogoBand";
import { HeroSystem } from "@/components/HeroSystem";
import { StepsShowcase } from "@/components/StepsShowcase";
import { useCms, useCmsMerged } from "@/content/ContentContext";
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
    id: "epgo",
    name: "EPgo",
    title: "Siparişten kapıya kadar teslimatı yönetin.",
    desc: "30–45 dakika hemen teslim, randevulu teslim, moto kurye ve frigolu panelvan çözümleri.",
    visual: "map",
  },
];

const HOME_HERO_DEFAULTS = {
  eyebrow: "Epersonel Dijital Satış Çözümleri",
  line1: "İşletmenize uygun",
  line2: "dijital satış",
  line3: "altyapısı.",
  desc: "Pazaryerlerinden kendi sipariş kanalınıza, sipariş yönetiminden teslimata kadar işletmenizin ihtiyacına uygun teknoloji ve operasyon çözümleri.",
  cta1Text: "Çözümleri Keşfet",
  cta1Link: "#cozumler",
  cta2Text: "Görüşme Planla",
  cta2Link: "/iletisim",
};

// CTA linki "#" ile başlıyorsa sayfa içi anchor, değilse route linki
const ctaLinkProps = (link) => (link || "").startsWith("#") ? { href: link } : { to: link || "/" };

const Hero = () => {
  const { hero } = useCmsMerged("home", { hero: HOME_HERO_DEFAULTS });
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
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-6 text-[42px] font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl" data-testid="hero-title">
            {[hero.line1, hero.line2, hero.line3].map((line, i) => (
              <span key={`${line}-${i}`} className="block overflow-hidden pb-1">
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
            {hero.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <CTAButton {...ctaLinkProps(hero.cta1Link)} testId="hero-cta-explore">
              {hero.cta1Text}
            </CTAButton>
            <CTAButton {...ctaLinkProps(hero.cta2Link)} variant="ghost" testId="hero-cta-meeting">
              {hero.cta2Text}
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
              </motion.div>
            </AnimatePresence>
            <div className="mt-5 h-[340px] sm:h-[380px]">
              <HeroSystem variant={tab.id} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const cmsSol = useCms("home")?.solutions;
  const solutions = SOLUTIONS.map((s) => {
    const o = (cmsSol || []).find((c) => c.id === s.id) || {};
    return { ...s, name: o.name || s.name, desc: o.desc || s.desc, cta: o.cta || s.cta, logo: o.logo || s.logo, path: o.link || s.path, visible: o.visible !== false };
  }).filter((s) => s.visible);

  return (
  <section id="cozumler" className="scroll-mt-24 py-24 md:py-32" data-testid="solutions-section">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="ÇÖZÜMLER"
        title="Her işletmenin ihtiyacı aynı değil."
        desc="Bu yüzden Epersonel tek bir ürün yerine işletmenizin yapısına uygun çözümler sunar."
        testId="solutions-heading"
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {solutions.map((s, i) => (
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

// "100K+" → { to: 100, suffix: "K+" } (sayaç animasyonu için)
const parseMetric = (v) => {
  const m = /^(\d+)(.*)$/.exec(v || "");
  return m ? { to: Number(m[1]), suffix: m[2] } : null;
};

const Metrics = () => {
  const cmsMetrics = useCms("home")?.metrics;
  const metrics = (cmsMetrics && cmsMetrics.length
    ? cmsMetrics
    : METRICS.map((m) => ({ value: `${m.value}${m.suffix}`, label: m.label, active: true }))
  ).filter((m) => m.active !== false);

  return (
  <section className="border-b border-line py-20 md:py-28" data-testid="metrics-section">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-5 md:grid-cols-4 md:px-8">
      {metrics.map((m, i) => {
        const parsed = parseMetric(m.value);
        return (
          <Reveal key={`${m.label}-${i}`} delay={i * 0.08}>
            <div data-testid={`metric-${i}`}>
              <p className="text-5xl font-extrabold tracking-tight text-ink md:text-6xl">
                {parsed ? <Counter to={parsed.to} suffix={parsed.suffix} /> : <span>{m.value || "—"}</span>}
              </p>
              <p className="mt-3 text-sm font-semibold text-mute">{m.label}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
  );
};

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

const FINAL_CTA_DEFAULTS = {
  eyebrow: "Nereden başlayacağınızdan emin değil misiniz?",
  title: "İhtiyacınızı anlatın, doğru çözümü birlikte bulalım.",
  desc: "İşletmenizin yapısını dinliyor, satış kanallarınızı ve operasyonunuzu analiz ediyor, size en uygun teknoloji + operasyon modelini birlikte belirliyoruz.",
  cta1Text: "Görüşme Planla",
  cta1Link: "/iletisim",
  cta2Text: "Bize Ulaşın",
  cta2Link: "/iletisim",
};

const BigCTA = () => {
  const { finalCta } = useCmsMerged("home", { finalCta: FINAL_CTA_DEFAULTS });
  return (
  <section className="py-24 md:py-36" data-testid="home-final-cta">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-white p-10 md:p-20">
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
            <span className="inline-block h-2 w-2 rounded-[3px] bg-brand" aria-hidden="true" />
            {finalCta.eyebrow}
          </p>
          <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {finalCta.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg">
            {finalCta.desc}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CTAButton {...ctaLinkProps(finalCta.cta1Link)} testId="home-cta-meeting">
              {finalCta.cta1Text}
            </CTAButton>
            <CTAButton {...ctaLinkProps(finalCta.cta2Link)} variant="dark" testId="home-cta-contact">
              {finalCta.cta2Text}
            </CTAButton>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
  );
};

export default function HomePage() {
  return (
    <>
      <Seo page="home"
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
            { "@type": "Brand", name: "EPgo" },
            { "@type": "Brand", name: "EPfood" },
          ],
        }}
      />
      <Hero />
      <LogoBand />
      <Solutions />
      <EcosystemFlow />
      <StepsShowcase />
      <Metrics />
      <Why />
      <Cases />
      <BigCTA />
    </>
  );
}
