import { useState } from "react";
import { Check } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { DashboardMock } from "@/components/DashboardMock";
import { PhoneMock } from "@/components/PhoneMock";
import { CaseCards } from "@/components/CaseCards";
import { LeadForm } from "@/components/LeadForm";
import { SystemVisual } from "@/components/SystemVisual";
import { LOGOS } from "@/data/site";

const Chips = ({ items, dark = false }) => (
  <div className="mt-6 flex flex-wrap gap-2">
    {items.map((c) => (
      <span
        key={c}
        className={`rounded-full px-4 py-2 text-[13px] font-semibold ${
          dark ? "border border-white/15 bg-white/5 text-white/80" : "border border-line bg-white text-ink"
        }`}
      >
        {c}
      </span>
    ))}
  </div>
);

const Bullets = ({ items }) => (
  <ul className="mt-6 space-y-3">
    {items.map((b) => (
      <li key={b} className="flex items-start gap-3 text-[15px] font-medium text-ink">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist">
          <Check className="h-3 w-3 text-ink" strokeWidth={3} />
        </span>
        {b}
      </li>
    ))}
  </ul>
);

const FeatureRow = ({ num, title, desc, bullets, chips, children, reverse = false, testId }) => (
  <Reveal>
    <div className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-20" data-testid={testId}>
      <div className={reverse ? "lg:order-2" : ""}>
        <span className="text-sm font-extrabold tracking-widest text-mute">{num}</span>
        <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">{title}</h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-mute md:text-lg">{desc}</p>
        {bullets && <Bullets items={bullets} />}
        {chips && <Chips items={chips} />}
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{children}</div>
    </div>
  </Reveal>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-mist pb-20 pt-36 md:pt-44" data-testid="epapp-hero">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
      <Reveal>
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
          <img src={LOGOS.epapp} alt="EPapp logosu" className="h-5 w-auto object-contain" />
          Orta & Büyük Ölçekli İşletmeler
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl" data-testid="epapp-hero-title">
          Tüm dijital satış kanallarınız.
          <br />
          <span className="text-mute">Tek altyapı.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg">
          Pazaryeri entegrasyonları, personel sipariş uygulaması, merkezi yönetim paneli ve markanıza özel mobil & web
          sipariş sistemi.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <CTAButton to="/iletisim" testId="epapp-hero-meeting">
            Görüşme Planla
          </CTAButton>
          <CTAButton href="#teklif" variant="dark" testId="epapp-hero-quote">
            Teklif Talep Et
          </CTAButton>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <SystemVisual variant="epapp" />
      </Reveal>
    </div>
  </section>
);

const ADMIN_TABS = [
  { key: "siparisler", label: "Sipariş" },
  { key: "personel", label: "Personel" },
  { key: "urunler", label: "Ürün" },
  { key: "subeler", label: "Mağaza" },
];

const AdminPanel = () => {
  const [tab, setTab] = useState("siparisler");
  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Admin panel bölümleri">
        {ADMIN_TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            data-testid={`admin-tab-${t.key}`}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
              tab === t.key ? "bg-ink text-white" : "border border-line bg-white text-mute hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <DashboardMock tab={tab} compact />
      </div>
    </div>
  );
};

const Features = () => (
  <section className="py-12 md:py-16" data-testid="epapp-features">
    <div className="mx-auto max-w-7xl divide-y divide-line px-5 md:px-8">
      <FeatureRow
        num="01"
        title="Pazaryeri Entegrasyonları"
        desc="Desteklenen tüm pazaryerleri tek altyapıya bağlanır; sipariş, ürün ve stok akışı merkezileşir."
        chips={["Trendyol", "Yemeksepeti", "Getir", "Pazarama", "ve desteklenen diğer kanallar"]}
        testId="epapp-feature-integrations"
      >
        <div className="rounded-3xl border border-line bg-mist p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mute">Bağlı kanallar</p>
          <div className="mt-5 space-y-3">
            {["Trendyol", "Yemeksepeti", "Getir", "Pazarama"].map((p, i) => (
              <div key={p} className="flex items-center justify-between rounded-2xl border border-line bg-white px-5 py-4">
                <span className="text-[15px] font-bold text-ink">{p}</span>
                <span className="flex items-center gap-2 text-xs font-bold text-mute">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-brand opacity-70" style={{ animationDelay: `${i * 0.4}s` }} />
                    <span className="relative h-2 w-2 rounded-full bg-brand" />
                  </span>
                  Bağlı
                </span>
              </div>
            ))}
          </div>
        </div>
      </FeatureRow>

      <FeatureRow
        num="02"
        title="Stok Entegrasyonu"
        desc="Kasa ve POS sisteminizle konuşan, saatlik güncellenen merkezi stok yönetimi."
        bullets={[
          "Kasa / POS entegrasyonu",
          "Saatlik otomatik stok aktarımı",
          "Virman sistemi",
          "Kategori bazlı emniyet stoğu",
          "Açık ürün stok yönetimi",
        ]}
        reverse
        testId="epapp-feature-stock"
      >
        <DashboardMock tab="stok" compact />
      </FeatureRow>

      <FeatureRow
        num="03"
        title="Fiyat Entegrasyonu"
        desc="Merkezden yönetilen fiyatlar, kurallarla otomatik güncellenir."
        bullets={[
          "Merkezi fiyat yönetimi",
          "Saatlik fiyat aktarımı",
          "Kategori bazlı markup",
          ".49 / .99 gibi fiyat sonlandırma kuralları",
        ]}
        testId="epapp-feature-price"
      >
        <DashboardMock tab="fiyat" compact />
      </FeatureRow>

      <FeatureRow
        num="04"
        title="Slot Entegrasyonu"
        desc="Teslimat kapasiteniz kanallarla otomatik senkronize edilir."
        bullets={[
          "3 günlük otomatik slot aktarımı",
          "Kapasite yönetimi",
          "İşletmeye özel slot",
          "Kendi sipariş uygulaması ile entegrasyon",
        ]}
        reverse
        testId="epapp-feature-slot"
      >
        <div className="rounded-3xl border border-line bg-mist p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mute">Önümüzdeki 3 gün</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["Bugün", "Yarın", "Çarşamba"].map((d, di) => (
              <div key={d} className="rounded-2xl border border-line bg-white p-4">
                <p className="text-xs font-bold text-ink">{d}</p>
                <div className="mt-3 space-y-1.5">
                  {["10:00", "12:00", "14:00", "16:00"].map((s, si) => (
                    <p
                      key={s}
                      className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${
                        (di + si) % 3 === 0 ? "bg-ink text-white" : "bg-mist text-mute"
                      }`}
                    >
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] font-semibold text-mute">Slotlar kanallara otomatik aktarılır</p>
        </div>
      </FeatureRow>

      <FeatureRow
        num="05"
        title="Personel Uygulaması"
        desc="Personeliniz 5 panel değil, tek uygulama kullansın. Trendyol, Yemeksepeti, Getir ve kendi uygulamanızdan gelen siparişler tek ekranda."
        chips={["Sipariş hazırlama", "Sipariş içeriği", "Personel performansı", "Fiş işlemleri", "Tek ekran"]}
        testId="epapp-feature-personel"
      >
        <div className="flex justify-center">
          <PhoneMock variant="personel" />
        </div>
      </FeatureRow>

      <FeatureRow
        num="06"
        title="Admin Panel"
        desc="Sipariş, ciro, personel, geciken sipariş, ürün ve mağaza yönetimi. Tüm raporlar tek panelde."
        reverse
        testId="epapp-feature-admin"
      >
        <AdminPanel />
      </FeatureRow>

      <FeatureRow
        num="07"
        title="Markaya Özel Mobil & Web Sipariş"
        desc="Pazaryerinde satış yapın. Ama müşterinizi kendi markanıza da taşıyın."
        chips={[
          "Markaya özel tasarım",
          "iOS",
          "Android",
          "Web",
          "Kredi / banka kartı",
          "Yemek kartı",
          "Kapıda ödeme",
          "Bildirim",
          "Kampanya",
          "Müşteri verisi",
          "Entegrasyon",
        ]}
        testId="epapp-feature-branded"
      >
        <div className="rounded-3xl bg-ink p-8 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Markanızın uygulaması</p>
          <p className="mt-4 text-2xl font-bold leading-snug tracking-tight md:text-3xl">
            Pazaryerinde satış yapın.
            <br />
            <span className="text-white/50">Müşterinizi kendi markanıza taşıyın.</span>
          </p>
          <div className="mt-8 flex gap-3">
            {["iOS", "Android", "Web"].map((p) => (
              <span key={p} className="rounded-full bg-white px-4 py-2 text-[13px] font-bold text-ink">
                {p}
              </span>
            ))}
          </div>
        </div>
      </FeatureRow>

      <FeatureRow
        num="08"
        title="Bir şubeden yüzlerce şubeye."
        desc="Çoklu şube yapısı merkezi yönetim ekranından izlenir; her şubenin performansı anlık takip edilir."
        reverse
        testId="epapp-feature-branches"
      >
        <DashboardMock tab="subeler" compact />
      </FeatureRow>

      <Reveal>
        <div className="grid items-center gap-8 rounded-[2rem] bg-coal p-10 text-white md:p-14 lg:grid-cols-[1fr_auto]" data-testid="epapp-kurye-band">
          <div>
            <img src={LOGOS.epkurye} alt="EPkurye logosu" className="h-7 w-auto rounded bg-white object-contain px-2 py-1" loading="lazy" />
            <h3 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">Siparişler EPkurye'ye yönlendirilebilir.</h3>
            <p className="mt-3 max-w-lg text-base text-white/60">
              Dilediğiniz kanaldan gelen siparişlerin teslimatını EPkurye operasyonuna devredin.
            </p>
          </div>
          <CTAButton to="/epkurye" testId="epapp-kurye-cta">
            EPkurye'yi Keşfet
          </CTAButton>
        </div>
      </Reveal>
    </div>
  </section>
);

const References = () => (
  <section className="bg-mist py-24 md:py-32" data-testid="epapp-references">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead
        eyebrow="REFERANSLAR"
        title="EPapp'e güvenen markalar."
        testId="epapp-references-heading"
      />
      <div className="mt-14">
        <CaseCards solution="epapp" />
      </div>
    </div>
  </section>
);

const Quote = () => (
  <section id="teklif" className="scroll-mt-24 py-24 md:py-32" data-testid="epapp-quote">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
      <SectionHead
        eyebrow="TEKLİF"
        title="Altyapınızı birlikte tasarlayalım."
        desc="İşletme yapınızı anlatın, size özel EPapp kurulum modeli ve teklifi hazırlayalım."
        testId="epapp-quote-heading"
      />
      <Reveal delay={0.1}>
        <LeadForm formType="teklif" buttonLabel="Teklif Talep Et" defaultSolution="epapp" testId="epapp-lead-form" />
      </Reveal>
    </div>
  </section>
);

export default function EpappPage() {
  return (
    <>
      <Seo
        title="EPapp — Dijital Satış Altyapısı | Epersonel"
        siteName="Epersonel"
        description="Pazaryeri entegrasyonları, personel sipariş uygulaması, merkezi yönetim paneli ve markanıza özel mobil & web sipariş sistemi."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "EPapp — Dijital Satış Altyapısı",
          provider: { "@type": "Organization", name: "Epersonel" },
          serviceType: "Dijital satış altyapısı ve entegrasyon",
        }}
      />
      <Hero />
      <Features />
      <References />
      <Quote />
    </>
  );
}
