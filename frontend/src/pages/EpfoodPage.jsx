import { useState } from "react";
import { ArrowDown } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { PhoneMock } from "@/components/PhoneMock";
import { DashboardMock } from "@/components/DashboardMock";
import { CaseCards } from "@/components/CaseCards";
import { LeadForm } from "@/components/LeadForm";
import { LOGOS } from "@/data/site";

const Chips = ({ items }) => (
  <div className="mt-6 flex flex-wrap gap-2">
    {items.map((c) => (
      <span key={c} className="rounded-full border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink">
        {c}
      </span>
    ))}
  </div>
);

const FeatureRow = ({ num, title, desc, chips, children, reverse = false, testId }) => (
  <Reveal>
    <div className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-20" data-testid={testId}>
      <div className={reverse ? "lg:order-2" : ""}>
        <span className="text-sm font-extrabold tracking-widest text-mute">{num}</span>
        <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">{title}</h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-mute md:text-lg">{desc}</p>
        {chips && <Chips items={chips} />}
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{children}</div>
    </div>
  </Reveal>
);

// Öncesi / Sonrası — gerçek ürün fotoğrafları geldiğinde görseller değiştirilecek.
const BeforeAfter = () => {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/3] select-none overflow-hidden rounded-3xl border border-line" data-testid="before-after">
      {/* SONRASI (alt katman) */}
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <div className="w-64 rounded-3xl border border-line bg-white p-5 shadow-[0_24px_60px_rgba(16,17,16,0.12)]">
          <div className="flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-orange-200">
            <div className="relative">
              <div className="h-10 w-28 rounded-t-full bg-gradient-to-b from-amber-300 to-amber-400" />
              <div className="h-3 w-28 bg-emerald-300" />
              <div className="h-4 w-28 bg-amber-700" />
              <div className="h-8 w-28 rounded-b-full bg-gradient-to-b from-amber-300 to-amber-400" />
            </div>
          </div>
          <p className="mt-4 text-sm font-extrabold text-ink">Klasik Burger</p>
          <p className="text-xs text-mute">Pişirme tercihi, ekstralar, sos seçimi</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="rounded-full bg-food px-3 py-1 text-xs font-extrabold text-ink">₺189,90</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-mute">Sonrası</span>
          </div>
        </div>
      </div>
      {/* ÖNCESİ (üst katman, clip) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="flex h-full items-center justify-center bg-mist">
          <div className="w-64 rounded-3xl border border-line bg-white p-5 grayscale">
            <div className="flex h-36 items-center justify-center rounded-2xl bg-line">
              <div className="h-20 w-20 rounded-full bg-mute/30" />
            </div>
            <div className="mt-4 h-3.5 w-2/3 rounded bg-line" />
            <div className="mt-2 h-2.5 w-1/2 rounded bg-line" />
            <div className="mt-3 flex items-center justify-between">
              <div className="h-6 w-16 rounded-full bg-line" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-mute">Öncesi</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 w-[2px] bg-ink" style={{ left: `${pos}%` }} aria-hidden="true">
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-[10px] font-extrabold text-white">
          ⇔
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Öncesi sonrası karşılaştırma kaydırıcısı"
        data-testid="before-after-slider"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
};

const Hero = () => (
  <section className="relative overflow-hidden pb-20 pt-36 md:pt-44" data-testid="epfood-hero">
    <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-food/10 blur-3xl" aria-hidden="true" />
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
      <Reveal>
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
          <img src={LOGOS.epfood} alt="ePFOOD logosu" className="h-5 w-auto object-contain" />
          Restoran & Yeme-İçme
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl" data-testid="epfood-hero-title">
          Restoranınızı dijital siparişe hazırlayın.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-mute md:text-lg">
          Panel kurulumu, menü yapısı, ürün seçenekleri, görseller, sipariş yönetimi ve teslimat çözümleri.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <CTAButton href="#teklif" testId="epfood-hero-quote">
            Restoranınız İçin Teklif Al
          </CTAButton>
          <CTAButton to="/iletisim" variant="ghost" testId="epfood-hero-meeting">
            Görüşme Planla
          </CTAButton>
        </div>
      </Reveal>
      <Reveal delay={0.15} className="flex justify-center">
        <PhoneMock variant="epfood" />
      </Reveal>
    </div>
  </section>
);

const Features = () => (
  <section className="py-12 md:py-16" data-testid="epfood-features">
    <div className="mx-auto max-w-7xl divide-y divide-line px-5 md:px-8">
      <FeatureRow
        num="01"
        title="Panel Kurulumu"
        desc="Restoranınızı desteklenen yemek platformlarında satışa hazır hale getiriyoruz: mağaza açılışı, komisyon ve operasyon ayarları."
        chips={["Trendyol Yemek", "Yemeksepeti", "GetirYemek", "ve diğer desteklenen platformlar"]}
        testId="epfood-feature-panel"
      >
        <div className="rounded-3xl border border-line bg-mist p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mute">Kurulum durumu</p>
          <div className="mt-5 space-y-3">
            {[
              ["Mağaza açılışı", "Tamamlandı"],
              ["Menü yapısı", "Tamamlandı"],
              ["Görsel çekimi", "Planlandı"],
              ["Sipariş ekranı", "Aktif"],
            ].map(([t, s]) => (
              <div key={t} className="flex items-center justify-between rounded-2xl border border-line bg-white px-5 py-4">
                <span className="text-[15px] font-bold text-ink">{t}</span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${s === "Planlandı" ? "bg-mist text-mute" : "bg-ink text-white"}`}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FeatureRow>

      <FeatureRow
        num="02"
        title="Menü Çalışması"
        desc="Kategoriler, ürünler, menüler ve combo yapıları satışa dönük şekilde kurgulanır."
        chips={["Kategoriler", "Ürünler", "Menüler", "Combo", "Fiyatlar"]}
        reverse
        testId="epfood-feature-menu"
      >
        <div className="flex justify-center">
          <PhoneMock variant="epfood" />
        </div>
      </FeatureRow>

      <FeatureRow
        num="03"
        title="Opsiyon & Ekstralar"
        desc="Her ürün için pişirme tercihi, ekstra malzeme ve ücretli eklentiler tanımlanır; müşteri seçimi siparişe net yansır."
        testId="epfood-feature-options"
      >
        <div className="rounded-3xl border border-line bg-white p-8 shadow-[0_24px_60px_rgba(16,17,16,0.08)]">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 to-orange-300 text-xl font-extrabold text-ink">
              B
            </div>
            <div>
              <p className="text-base font-extrabold text-ink">Klasik Burger</p>
              <p className="text-sm text-mute">₺189,90</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {[
              ["Pişirme tercihi", ["Az", "Orta", "İyi"]],
              ["Ekstra cheddar", ["Ekle +₺25"]],
              ["Patates seçimi", ["Küçük", "Orta", "Büyük"]],
              ["Sos", ["Ketçap", "Mayonez", "Acı sos"]],
            ].map(([group, opts]) => (
              <div key={group}>
                <p className="text-xs font-bold uppercase tracking-wider text-mute">{group}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {opts.map((o, i) => (
                    <span
                      key={o}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${
                        i === 0 ? "bg-food text-ink" : "border border-line bg-white text-ink"
                      }`}
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FeatureRow>

      <FeatureRow
        num="04"
        title="Ürün Görselleri"
        desc="Ürünlerinizi yalnızca yüklemiyoruz. Satışa hazırlıyoruz."
        reverse
        testId="epfood-feature-visuals"
      >
        <BeforeAfter />
      </FeatureRow>

      <FeatureRow
        num="05"
        title="4 tablet yerine tek ekran."
        desc="Trendyol Yemek, Yemeksepeti, GetirYemek ve diğer desteklenen platformlardan gelen tüm siparişler tek ePFOOD sipariş ekranında birleşir."
        testId="epfood-feature-orders"
      >
        <DashboardMock tab="siparisler" compact />
      </FeatureRow>

      <Reveal>
        <div className="grid items-center gap-8 rounded-[2rem] bg-ink p-10 text-white md:p-14 lg:grid-cols-[1fr_auto]" data-testid="epfood-kurye-band">
          <div>
            <img src={LOGOS.epkurye} alt="ePKURYE logosu" className="h-7 w-auto rounded bg-white object-contain px-2 py-1" loading="lazy" />
            <h3 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">Mutfaktan kapıya kadar.</h3>
            <p className="mt-3 max-w-lg text-base text-white/60">
              Restoran siparişlerinizi ePKURYE ile teslim edin; 30–45 dakika hemen teslim ve randevulu teslim seçenekleriyle.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <ArrowDown className="h-5 w-5 rotate-[-135deg] text-white/40" aria-hidden="true" />
            <CTAButton to="/epkurye" testId="epfood-kurye-cta">
              ePKURYE'yi Keşfet
            </CTAButton>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const References = () => (
  <section className="bg-mist py-24 md:py-32" data-testid="epfood-references">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="REFERANSLAR"
        title="ePFOOD'a güvenen restoranlar."
        desc="Referans logoları ve vaka çalışmaları ekleniyor."
        testId="epfood-references-heading"
      />
      <div className="mt-14">
        <CaseCards solution="epfood" />
      </div>
    </div>
  </section>
);

const Quote = () => (
  <section id="teklif" className="scroll-mt-24 py-24 md:py-32" data-testid="epfood-quote">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
      <SectionHead
        eyebrow="TEKLİF"
        title="Restoranınızı dijitale taşıyalım."
        desc="Menünüzü ve operasyonunuzu anlatın, size özel ePFOOD kurulum teklifi hazırlayalım."
        testId="epfood-quote-heading"
      />
      <Reveal delay={0.1}>
        <LeadForm formType="teklif" buttonLabel="Restoranınız İçin Teklif Al" defaultSolution="epfood" testId="epfood-lead-form" />
      </Reveal>
    </div>
  </section>
);

export default function EpfoodPage() {
  return (
    <div data-accent="food">
      <Seo
        title="ePFOOD — Restoranlar İçin Dijital Satış | Epersonel"
        siteName="Epersonel"
        description="Panel kurulumu, menü yapısı, ürün seçenekleri, görseller, sipariş yönetimi ve teslimat çözümleri."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "ePFOOD — Restoran Dijital Satış",
          provider: { "@type": "Organization", name: "Epersonel" },
          serviceType: "Restoran dijital sipariş operasyonu",
        }}
      />
      <Hero />
      <Features />
      <References />
      <Quote />
    </div>
  );
}
