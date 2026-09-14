import { useState } from "react";
import { Check, ShoppingBasket, Beef, Apple, Sandwich, PawPrint, Droplets } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { PhoneMock } from "@/components/PhoneMock";
import { SystemVisual } from "@/components/SystemVisual";
import { FAQ } from "@/components/FAQ";
import { CaseCards } from "@/components/CaseCards";
import { LeadForm } from "@/components/LeadForm";
import { EP_PRICING, EP_FAQ, LOGOS } from "@/data/site";

const SECTORS = [
  { label: "Market", icon: ShoppingBasket },
  { label: "Kasap", icon: Beef },
  { label: "Manav", icon: Apple },
  { label: "Şarküteri", icon: Sandwich },
  { label: "Petshop", icon: PawPrint },
  { label: "Su Bayii", icon: Droplets },
];

const PLATFORMS = ["Trendyol Go Market", "Yemeksepeti Mahalle", "Getir Çarşı", "ve diğer desteklenen platformlar"];

const FLOW = [
  "İşletme başvurusu",
  "Pazaryeri mağaza açılışı",
  "Ürünlerin yüklenmesi",
  "Stok & fiyat yönetimi",
  "EP uygulamasının teslimi",
  "Sürekli operasyon desteği",
];

const APP_FEATURES = ["Barkod okut", "Ürün bul", "Fiyat gir / değiştir", "Stok yönet", "Kampanya talebi ilet", "Ürün listesini görüntüle"];

const Hero = () => (
  <section className="relative overflow-hidden pb-20 pt-36 md:pt-44" data-testid="ep-hero">
    <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
      <div>
        <Reveal>
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
            <img src={LOGOS.ep} alt="EP logosu" className="h-5 w-auto object-contain" />
            Yerel İşletmeler İçin
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl" data-testid="ep-hero-title">
            Pazaryerlerinde satışa başlayın.
            <br />
            <span className="text-mute">Operasyonu bize bırakın.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-mute md:text-lg">
            İşletmenizi desteklenen pazaryerlerinde satışa açıyor, ürünlerinizi hazırlıyor, stok ve fiyat süreçlerinizi
            yönetiyor ve size kendi EP uygulamanızı sunuyoruz.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CTAButton href="#basvuru" testId="ep-hero-start">
              Hemen Başla
            </CTAButton>
            <CTAButton to="/iletisim" variant="ghost" testId="ep-hero-meeting">
              Görüşme Planla
            </CTAButton>
          </div>
          <div className="mt-10 flex flex-wrap gap-2" data-testid="ep-platforms">
            {PLATFORMS.map((p) => (
              <span key={p} className="rounded-full border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink">
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.15} className="relative mt-4 lg:mt-0">
        <SystemVisual variant="ep" />
      </Reveal>
    </div>
  </section>
);

const Sectors = () => (
  <section className="border-y border-line bg-mist py-14" data-testid="ep-sectors">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5 md:px-8">
      {SECTORS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.05}>
          <span className="flex items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3 text-[15px] font-bold text-ink transition-colors hover:border-ink">
            <s.icon className="h-4 w-4 text-ink" strokeWidth={2.2} aria-hidden="true" />
            {s.label}
          </span>
        </Reveal>
      ))}
    </div>
  </section>
);

const Flow = () => (
  <section className="py-24 md:py-32" data-testid="ep-flow">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead eyebrow="NASIL ÇALIŞIR" title="Başvurudan satışa, altı adım." testId="ep-flow-heading" />
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {FLOW.map((step, i) => (
          <div key={step} className="group bg-white p-8 transition-colors duration-300 hover:bg-mist">
            <span className="text-sm font-extrabold text-mute transition-colors group-hover:text-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-6 text-lg font-bold tracking-tight text-ink">{step}</p>
            <span className="mt-4 block h-[3px] w-8 rounded-full bg-brand transition-all duration-300 group-hover:w-14" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AppSection = () => (
  <section className="bg-mist py-24 md:py-32" data-testid="ep-app">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
      <SectionHead
        eyebrow="EP UYGULAMASI"
        title="Operasyon cebinizde."
        desc="EP uygulaması ile mağazanızın günlük pazaryeri operasyonunu telefonunuzdan yönetin."
        testId="ep-app-heading"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {APP_FEATURES.map((f, i) => (
          <Reveal key={f} delay={i * 0.05}>
            <div className="flex h-full min-h-[96px] items-center rounded-2xl border border-line bg-white p-4 text-sm font-bold text-ink transition-colors hover:border-ink">
              {f}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
    <Reveal delay={0.1} className="mt-16 flex justify-center">
      <div className="flex items-end gap-6">
        <PhoneMock variant="ep" className="hidden sm:block" />
        <PhoneMock variant="ep" />
      </div>
    </Reveal>
  </section>
);

// İnteraktif pricing: varsayılan aktif EP Plus; hover'da aktiflik karta geçer, çıkınca Plus'a döner.
// Aktif kart: beyaz/açık yeşil yüzey + yeşil border/glow (tam siyah yok).
const Pricing = () => {
  const [active, setActive] = useState("EP Plus");
  return (
    <section className="py-24 md:py-32" data-testid="ep-pricing">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="FİYATLANDIRMA"
          title="İşletmenize uyan paketi seçin."
          align="center"
          testId="ep-pricing-heading"
        />
        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3" onMouseLeave={() => setActive("EP Plus")}>
          {EP_PRICING.map((p, i) => {
            const isActive = active === p.name;
            return (
              <Reveal key={p.name} delay={i * 0.08} className="h-full">
                <article
                  onMouseEnter={() => setActive(p.name)}
                  data-testid={`pricing-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`relative flex h-full flex-col rounded-[2rem] p-8 transition-all duration-500 md:p-10 ${
                    isActive
                      ? "-translate-y-2 border-2 border-brand bg-white shadow-[0_28px_80px_-20px_rgba(var(--brand-rgb),0.45),0_12px_32px_-12px_rgba(16,17,16,0.14)]"
                      : "border border-line bg-white hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_16px_40px_rgba(16,17,16,0.08)]"
                  }`}
                >
                  {isActive && (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-brand/[0.09] via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <div
                        className="pointer-events-none absolute inset-x-10 -top-6 h-12 rounded-full bg-brand/30 blur-2xl"
                        aria-hidden="true"
                      />
                    </>
                  )}
                  {p.badge && (
                    <span className="absolute -top-3.5 left-8 z-10 flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-xs font-bold text-white shadow-[0_8px_20px_rgba(16,17,16,0.25)]">
                      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-brand" />
                        <span className="h-full w-full rounded-full bg-brand" />
                      </span>
                      {p.badge}
                    </span>
                  )}
                  <h3 className="relative text-lg font-bold text-ink">{p.name}</h3>
                  <p className="relative mt-5 flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold tracking-tight text-ink">₺{p.price}</span>
                    <span className="text-xs font-semibold text-mute">+ KDV / ay</span>
                  </p>
                  <ul className="relative mt-8 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            isActive ? "bg-brand text-ink" : "bg-mist text-ink"
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <CTAButton
                    href="#basvuru"
                    variant={isActive ? "primary" : "ghost"}
                    className="relative mt-9 w-full"
                    testId={`pricing-cta-${i}`}
                  >
                    Hemen Başla
                  </CTAButton>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CrossSell = () => (
  <section className="relative overflow-hidden bg-coal py-24 text-white md:py-32" data-testid="ep-cross-sell">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1fr_auto]">
      <Reveal>
        <img src={LOGOS.epgo} alt="EPgo logosu" className="h-8 w-auto rounded bg-white object-contain px-2 py-1" loading="lazy" />
        <h2 className="mt-6 max-w-xl text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">
          Satışı açtık.
          <br />
          Teslimatı da yapalım.
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
          EP müşterileri, EPgo ile 30–45 dakika hemen teslim ve randevulu teslim hizmeti alabilir. Siparişten kapıya
          kadar tüm süreç tek ekipte.
        </p>
      </Reveal>
      <Reveal delay={0.15} className="w-full lg:w-auto">
        <div className="relative flex h-52 items-end justify-center pb-1 lg:h-[272px] lg:w-[440px]" data-testid="ep-cross-sell-visual">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-3xl sm:w-80 lg:w-96"
            aria-hidden="true"
          />
          <img
            src="/assets/epgo-scooter.png"
            alt="EPgo kuryesi — EPgo logolu teslimat çantasıyla beyaz scooter"
            className="absolute inset-0 z-0 m-auto h-full w-full object-contain"
            loading="lazy"
            data-testid="ep-cross-sell-image"
          />
          <CTAButton to="/epgo" testId="ep-cross-sell-cta" className="relative z-10">
            EPgo'yu Keşfet
          </CTAButton>
        </div>
      </Reveal>
    </div>
  </section>
);

const FaqSection = () => (
  <section className="py-24 md:py-32" data-testid="ep-faq">
    <div className="mx-auto max-w-4xl px-5 md:px-8">
      <SectionHead eyebrow="SSS" title="Sık sorulan sorular." testId="ep-faq-heading" />
      <div className="mt-12">
        <FAQ items={EP_FAQ} testId="ep-faq-list" />
      </div>
    </div>
  </section>
);

const References = () => (
  <section className="bg-mist py-24 md:py-32" data-testid="ep-references">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead eyebrow="REFERANSLAR" title="EP'ye güvenen işletmeler." testId="ep-references-heading" />
      <div className="mt-14">
        <CaseCards solution="ep" />
      </div>
    </div>
  </section>
);

const Apply = () => (
  <section id="basvuru" className="scroll-mt-24 py-24 md:py-32" data-testid="ep-apply">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
      <SectionHead
        eyebrow="HEMEN BAŞLA"
        title="İşletmenizi pazaryerlerine taşıyalım."
        desc="Formu doldurun, işletmenize uygun EP paketini birlikte belirleyelim."
        testId="ep-apply-heading"
      />
      <Reveal delay={0.1}>
        <LeadForm formType="basvuru" buttonLabel="Hemen Başla" defaultSolution="ep" testId="ep-lead-form" />
      </Reveal>
    </div>
  </section>
);

export default function EpPage() {
  return (
    <>
      <Seo
        title="EP — Yerel İşletmeler İçin Pazaryeri Operasyonu | Epersonel"
        siteName="Epersonel"
        description="Market, kasap, manav, şarküteri, petshop ve su bayileri için pazaryeri mağaza açılışı, ürün yükleme, stok & fiyat yönetimi ve EP uygulaması."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "EP — Pazaryeri Operasyonu",
          provider: { "@type": "Organization", name: "Epersonel" },
          serviceType: "Pazaryeri operasyon yönetimi",
        }}
      />
      <Hero />
      <Sectors />
      <Flow />
      <AppSection />
      <Pricing />
      <CrossSell />
      <FaqSection />
      <References />
      <Apply />
    </>
  );
}
