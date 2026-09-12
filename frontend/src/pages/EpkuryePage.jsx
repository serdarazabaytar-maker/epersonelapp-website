import { Clock3, CalendarClock, Bike, Snowflake, ArrowDown } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { MapMock } from "@/components/MapMock";
import { CaseCards } from "@/components/CaseCards";
import { LeadForm } from "@/components/LeadForm";
import { LOGOS } from "@/data/site";

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

const Hero = () => (
  <section className="relative overflow-hidden pb-20 pt-36 md:pt-44" data-testid="epkurye-hero">
    <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <Reveal className="max-w-3xl">
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
          <img src={LOGOS.epkurye} alt="ePKURYE logosu" className="h-5 w-auto object-contain" />
          Teslimat Operasyonu
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl" data-testid="epkurye-hero-title">
          Sipariş hazır.
          <br />
          <span className="text-mute">Gerisini ePKURYE'ye bırakın.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg">
          Hemen teslim, randevulu teslim, moto kurye ve işletmeye özel frigolu panelvan çözümleri.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <CTAButton href="#teklif" testId="epkurye-hero-quote">
            Teslimat Teklifi Al
          </CTAButton>
          <CTAButton to="/iletisim" variant="ghost" testId="epkurye-hero-meeting">
            Operasyonu Görüşelim
          </CTAButton>
        </div>
      </Reveal>
      <Reveal delay={0.2} className="mt-16">
        <MapMock className="h-[400px] md:h-[480px]" />
      </Reveal>
    </div>
  </section>
);

const Services = () => (
  <section className="py-24 md:py-32" data-testid="epkurye-services">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="HİZMETLER"
        title="İşletmenizin ritmine uyan teslimat modelleri."
        testId="epkurye-services-heading"
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {SERVICES.map((s, i) => (
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

      <Reveal delay={0.1}>
        <article
          className="mt-5 overflow-hidden rounded-[2rem] bg-ink p-10 text-white md:p-14"
          data-testid="epkurye-frigolu"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                <Snowflake className="h-3.5 w-3.5" />
                Premium Hizmet
              </span>
              <h3 className="mt-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                İşletmeye Özel Frigolu Panelvan
              </h3>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
                Motorla hızlı teslim. Frigolu araçla kontrollü teslim. Soğuk zincir gerektiren ürünleriniz için size
                özel araç ve rota planlaması.
              </p>
              <div className="mt-8">
                <CTAButton href="#teklif" testId="epkurye-frigolu-cta">
                  Teslimat Teklifi Al
                </CTAButton>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Kontrollü teslimat</p>
              <ul className="mt-5 space-y-4">
                {["Soğuk zincir takibi", "İşletmeye özel araç", "Planlanmış rotalar", "Randevulu dağıtım"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[15px] font-semibold text-white/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  </section>
);

const AnyChannel = () => (
  <section className="border-y border-line bg-mist py-24 md:py-32" data-testid="epkurye-any-channel">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="TESLİMAT KATMANI"
        title="Nereden sipariş gelirse gelsin."
        desc="EP, ePAPP, ePFOOD veya kendi harici satış kanalınız — tüm siparişlerin teslimatını ePKURYE üstlenebilir."
        testId="epkurye-flow-heading"
      />
      <Reveal delay={0.1}>
        <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-3" data-testid="epkurye-flow">
          <div className="flex flex-wrap justify-center gap-2">
            {["EP", "ePAPP", "ePFOOD", "Harici satış kanalı"].map((s) => (
              <span key={s} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-ink">
                {s}
              </span>
            ))}
          </div>
          <ArrowDown className="mt-2 h-5 w-5 text-mute" aria-hidden="true" />
          <div className="rounded-full bg-white px-8 py-4 shadow-[0_16px_50px_rgba(16,17,16,0.1)]">
            <img src={LOGOS.epkurye} alt="ePKURYE" className="h-7 w-auto object-contain" loading="lazy" />
          </div>
          <ArrowDown className="h-5 w-5 text-mute" aria-hidden="true" />
          <span className="rounded-full bg-ink px-8 py-4 text-sm font-bold text-white">Müşteri</span>
        </div>
      </Reveal>
    </div>
  </section>
);

const References = () => (
  <section className="py-24 md:py-32" data-testid="epkurye-references">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="REFERANSLAR"
        title="Teslimatını bize emanet edenler."
        desc="Referans logoları ve vaka çalışmaları ekleniyor."
        testId="epkurye-references-heading"
      />
      <div className="mt-14">
        <CaseCards solution="epkurye" />
      </div>
    </div>
  </section>
);

const Quote = () => (
  <section id="teklif" className="scroll-mt-24 bg-mist py-24 md:py-32" data-testid="epkurye-quote">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
      <SectionHead
        eyebrow="TEKLİF"
        title="Teslimat modelinizi birlikte kuralım."
        desc="İhtiyacınızı anlatın; hemen teslim, randevulu teslim veya frigolu araç — size uygun modeli belirleyelim."
        testId="epkurye-quote-heading"
      />
      <Reveal delay={0.1}>
        <LeadForm
          formType="teslimat"
          buttonLabel="Teslimat Teklifi Al"
          defaultSolution="epkurye"
          showDelivery
          testId="epkurye-lead-form"
        />
      </Reveal>
    </div>
  </section>
);

export default function EpkuryePage() {
  return (
    <>
      <Seo
        title="ePKURYE — Teslimat ve Kurye Operasyonu | Epersonel"
        siteName="Epersonel"
        description="30–45 dakika hemen teslim, randevulu teslim, moto kurye ve işletmeye özel frigolu panelvan çözümleri."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "ePKURYE — Teslimat ve Kurye Operasyonu",
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
