import { Clock3, CalendarClock, Bike, Snowflake, ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { EpgoMap } from "@/components/EpgoMap";
import { CaseCards } from "@/components/CaseCards";
import { LeadForm } from "@/components/LeadForm";
import { LOGOS } from "@/data/site";
import { useCms, useCmsMerged, ctaLinkProps } from "@/content/ContentContext";

const EPGO_HERO_DEFAULTS = {
  eyebrow: "Teslimat Operasyonu",
  title1: "Sipariş hazır.",
  title2: "Gerisini EPgo'ya bırakın.",
  desc: "Hemen teslim, randevulu teslim, moto kurye ve işletmeye özel frigolu panelvan çözümleri.",
  cta1Text: "Teslimat Teklifi Al",
  cta1Link: "#teklif",
  cta2Text: "Operasyonu Görüşelim",
  cta2Link: "/iletisim",
};

const SERVICES = [
  {
    icon: Clock3,
    title: "30–45 Dakika Hemen Teslim",
    desc: "Sipariş hazır olduğunda kurye yola çıkar; müşteriniz dakikalar içinde teslim alır.",
  },
  {
    icon: CalendarClock,
    title: "Randevulu Teslim",
    desc: "Müşterinizin seçtiği zaman aralığında, planlı ve öngörülebilir teslimat.",
  },
  {
    icon: Bike,
    title: "Moto Kurye",
    desc: "Şehir içi hızlı teslimat için moto kurye ağı; her sipariş adım adım izlenir.",
  },
];

const Hero = () => {
  const { hero } = useCmsMerged("page_epgo", { hero: EPGO_HERO_DEFAULTS });
  return (
  <section className="relative overflow-hidden pb-20 pt-36 md:pt-44" data-testid="epgo-hero">
    <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
      <Reveal className="max-w-3xl">
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
          <img src={LOGOS.epgo} alt="EPgo logosu" className="h-5 w-auto object-contain" />
          {hero.eyebrow}
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl" data-testid="epgo-hero-title">
          {hero.title1}
          <br />
          <span className="text-mute">{hero.title2}</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg">
          {hero.desc}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <CTAButton {...ctaLinkProps(hero.cta1Link)} testId="epgo-hero-quote">
            {hero.cta1Text}
          </CTAButton>
          <CTAButton {...ctaLinkProps(hero.cta2Link)} variant="ghost" testId="epgo-hero-meeting">
            {hero.cta2Text}
          </CTAButton>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <EpgoMap />
      </Reveal>
    </div>
  </section>
  );
};

const EPGO_AREA_KEYS = ["hemen", "randevulu", "moto"];

const Services = () => {
  const cmsAreas = useCms("page_epgo")?.areas || [];
  const ao = (k) => cmsAreas.find((a) => a.key === k) || {};
  const services = SERVICES.map((s, i) => {
    const o = ao(EPGO_AREA_KEYS[i]);
    return { ...s, title: o.title || s.title, desc: o.desc || s.desc, visible: o.visible !== false };
  }).filter((s) => s.visible);
  const frigolu = ao("frigolu");
  return (
  <section className="py-24 md:py-32" data-testid="epgo-services">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="HİZMETLER"
        title="İşletmenizin ritmine uyan teslimat modelleri."
        testId="epgo-services-heading"
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08} className="h-full">
            <article className="group h-full rounded-[2rem] border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:shadow-[0_24px_70px_rgba(16,17,16,0.1)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-7 text-xl font-bold tracking-tight text-ink">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">{s.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {frigolu.visible !== false && (
      <Reveal delay={0.1}>
        <article
          className="mt-5 overflow-hidden rounded-[2rem] bg-ink p-10 text-white md:p-14"
          data-testid="epgo-frigolu"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                <Snowflake className="h-3.5 w-3.5" />
                Premium Hizmet
              </span>
              <h3 className="mt-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                {frigolu.title || "İşletmeye Özel Frigolu Panelvan"}
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
                {frigolu.desc ||
                  "Motorla hızlı teslim. Frigolu araçla kontrollü teslim. Soğuk zincir gerektiren ürünleriniz için size özel araç ve rota planlaması."}
              </p>
              <div className="mt-8">
                <CTAButton href="#teklif" testId="epgo-frigolu-cta">
                  {frigolu.cta || "Teslimat Teklifi Al"}
                </CTAButton>
              </div>
            </div>
            <CourierVisual src={frigolu.image} />
          </div>
        </article>
      </Reveal>
      )}
    </div>
  </section>
  );
};

// Frigolu bandının ana görseli — EPgo kuryesi (transparan cutout, koyu zeminde doğrudan oturur).
const CourierVisual = ({ src }) => {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex items-end justify-center lg:self-end" data-testid="epgo-frigolu-visual">
      <div
        className="pointer-events-none absolute bottom-4 left-1/2 h-64 w-full max-w-[420px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={src || "/assets/epgo-kurye.png"}
          alt="EPgo teslimat ekibi — EPgo logolu frigolu panelvan, kasklı kurye, beyaz scooter ve market poşeti"
          className="relative z-10 h-auto w-full max-w-[540px] object-contain"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          data-testid="epgo-courier-image"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

const AnyChannel = () => (
  <section className="border-y border-line bg-mist py-24 md:py-32" data-testid="epgo-any-channel">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="TESLİMAT KATMANI"
        title="Nereden sipariş gelirse gelsin."
        desc="EP, EPapp, EPfood veya kendi harici satış kanalınız — tüm siparişlerin teslimatını EPgo üstlenebilir."
        testId="epgo-flow-heading"
      />
      <Reveal delay={0.1}>
        <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-3" data-testid="epgo-flow">
          <div className="flex flex-wrap justify-center gap-2">
            {["EP", "EPapp", "EPfood", "Harici satış kanalı"].map((s) => (
              <span key={s} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-ink">
                {s}
              </span>
            ))}
          </div>
          <ArrowDown className="mt-2 h-5 w-5 text-mute" aria-hidden="true" />
          <div className="rounded-full bg-white px-8 py-4 shadow-[0_16px_50px_rgba(16,17,16,0.1)]">
            <img src={LOGOS.epgo} alt="EPgo" className="h-7 w-auto object-contain" loading="lazy" />
          </div>
          <ArrowDown className="mt-2 h-5 w-5 text-mute" aria-hidden="true" />
          <span className="rounded-full bg-ink px-8 py-4 text-sm font-bold text-white">Müşteri</span>
        </div>
      </Reveal>
    </div>
  </section>
);

const References = () => (
  <section className="py-24 md:py-32" data-testid="epgo-references">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="REFERANSLAR"
        title="Teslimatını bize emanet edenler."
        testId="epgo-references-heading"
      />
      <div className="mt-14">
        <CaseCards solution="epgo" />
      </div>
    </div>
  </section>
);

const Quote = () => (
  <section id="teklif" className="scroll-mt-24 bg-mist py-24 md:py-32" data-testid="epgo-quote">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
      <SectionHead
        eyebrow="TEKLİF"
        title="Teslimat modelinizi birlikte kuralım."
        desc="İhtiyacınızı anlatın; hemen teslim, randevulu teslim veya frigolu araç — size uygun modeli belirleyelim."
        testId="epgo-quote-heading"
      />
      <Reveal delay={0.1}>
        <LeadForm
          formType="teslimat"
          buttonLabel="Teslimat Teklifi Al"
          defaultSolution="epgo"
          showDelivery
          testId="epgo-lead-form"
        />
      </Reveal>
    </div>
  </section>
);

export default function EpgoPage() {
  return (
    <>
      <Seo page="epgo"
        title="EPgo — Teslimat ve Kurye Operasyonu | Epersonel"
        siteName="Epersonel"
        description="30–45 dakika hemen teslim, randevulu teslim, moto kurye ve işletmeye özel frigolu panelvan çözümleri."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "EPgo — Teslimat ve Kurye Operasyonu",
          provider: { "@type": "Organization", name: "Epersonel" },
          serviceType: "Teslimat ve kurye operasyonu",
        }}
      />
      <Hero />
      <Services />
      <AnyChannel />
      <References />
      <Quote />
    </>
  );
}
