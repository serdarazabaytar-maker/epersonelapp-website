import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";
import { DashboardMock } from "@/components/DashboardMock";
import { EpappFlow } from "@/components/EpappFlow";
import { CaseCards } from "@/components/CaseCards";
import { LeadForm } from "@/components/LeadForm";
import { LOGOS } from "@/data/site";
import { useCms, useCmsMerged, ctaLinkProps } from "@/content/ContentContext";

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

const FeatureRow = ({ num, title, desc, bullets, chips, children, reverse = false, testId, hidden = false }) => {
  if (hidden) return null;
  return (
  <Reveal>
    <div className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-20" data-testid={testId}>
      <div className={`min-w-0 ${reverse ? "lg:order-2" : ""}`}>
        <span className="text-sm font-extrabold tracking-widest text-mute">{num}</span>
        <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">{title}</h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-mute md:text-lg">{desc}</p>
        {bullets && <Bullets items={bullets} />}
        {chips && <Chips items={chips} />}
      </div>
      <div className={`min-w-0 ${reverse ? "lg:order-1" : ""}`}>{children}</div>
    </div>
  </Reveal>
  );
};

const EPAPP_HERO_DEFAULTS = {
  eyebrow: "Çok Şubeli İşletmeler",
  title1: "Tüm dijital satış kanallarınız.",
  title2: "Tek altyapı.",
  desc: "Pazaryeri entegrasyonları, personel sipariş uygulaması, merkezi yönetim paneli ve markanıza özel mobil & web sipariş sistemi.",
  cta1Text: "Görüşme Planla",
  cta1Link: "/iletisim",
  cta2Text: "Teklif Talep Et",
  cta2Link: "#teklif",
};

const Hero = () => {
  const { hero } = useCmsMerged("page_epapp", { hero: EPAPP_HERO_DEFAULTS });
  return (
  <section className="relative overflow-hidden bg-mist pb-20 pt-36 md:pt-44" data-testid="epapp-hero">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
      <Reveal>
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
          <img src={LOGOS.epapp} alt="EPapp logosu" className="h-5 w-auto object-contain" />
          {hero.eyebrow}
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl" data-testid="epapp-hero-title">
          {hero.title1}
          <br />
          <span className="text-mute">{hero.title2}</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg">
          {hero.desc}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <CTAButton {...ctaLinkProps(hero.cta1Link)} testId="epapp-hero-meeting">
            {hero.cta1Text}
          </CTAButton>
          <CTAButton {...ctaLinkProps(hero.cta2Link)} variant="dark" testId="epapp-hero-quote">
            {hero.cta2Text}
          </CTAButton>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <EpappFlow />
      </Reveal>
    </div>
  </section>
  );
};

const BrandChannel = () => {
  const cmsAreas = useCms("page_epapp")?.areas || [];
  const area = cmsAreas.find((a) => a.key === "marka") || {};
  if (area.visible === false) return null;
  return (
  <section className="grain coal-grid relative overflow-hidden bg-coal py-24 text-white md:py-32" data-testid="epapp-brand-channel">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
      <Reveal>
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-white/50">
          <span className="inline-block h-2 w-2 rounded-[3px] bg-brand" aria-hidden="true" />
          Markaya Özel Mobil & Web
        </p>
        {area.title ? (
          <h2 className="mt-6 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">{area.title}</h2>
        ) : (
          <h2 className="mt-6 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">
            Pazaryerlerinde satış yapın.
            <br />
            <span className="text-white/50">Kendi sipariş kanalınızı da büyütün.</span>
          </h2>
        )}
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
          {area.desc ||
            "Markanıza özel iOS ve Android uygulaması ile web sipariş kanalını kuruyoruz. Tüm siparişler EPapp merkezi yönetimine akar; müşteri verisi sizde kalır."}
        </p>
        <Chips
          dark
          items={[
            "Markaya özel tasarım",
            "iOS",
            "Android",
            "Web sipariş",
            "Online ödeme",
            "Yemek kartı",
            "Kapıda ödeme",
            "Bildirimler",
            "Kampanyalar",
            "Müşteri verisi",
            "Sipariş entegrasyonu",
            "Merkezi yönetim",
          ]}
        />
        <div className="mt-9">
          <CTAButton href="#teklif" testId="epapp-brand-cta">
            Teklif Talep Et
          </CTAButton>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="flex justify-center" data-testid="epapp-brand-visual">
          <img
            src={area.image || "/assets/epapp-brand-channel.png"}
            alt="Markaya özel sipariş kanalları — web sipariş sitesi, mobil ana sayfa, mobil ürün listeleme ve mobil ödeme ekranları"
            className="h-auto w-full object-contain lg:scale-[1.2]"
            loading="lazy"
            data-testid="epapp-brand-image"
          />
        </div>
      </Reveal>
    </div>
  </section>
  );
};

const Features = () => {
  const cmsAreas = useCms("page_epapp")?.areas || [];
  const ao = (k) => cmsAreas.find((a) => a.key === k) || {};
  return (
  <section className="py-12 md:py-16" data-testid="epapp-features">
    <div className="mx-auto max-w-7xl divide-y divide-line px-5 md:px-8">
      <FeatureRow
        num="01"
        title={ao("entegrasyon").title || "Pazaryeri Entegrasyonları"}
        desc={ao("entegrasyon").desc || "Desteklenen tüm pazaryerleri tek altyapıya bağlanır; sipariş, ürün ve stok akışı merkezileşir."}
        hidden={ao("entegrasyon").visible === false}
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
        title={ao("personel").title || "Personel Uygulaması"}
        desc={ao("personel").desc || "Personeliniz 5 panel değil, tek uygulama kullansın. Trendyol, Yemeksepeti, Getir ve kendi uygulamanızdan gelen siparişler tek ekranda."}
        hidden={ao("personel").visible === false}
        chips={["Sipariş hazırlama", "Sipariş içeriği", "Personel performansı", "Fiş işlemleri", "Tek ekran"]}
        testId="epapp-feature-personel"
      >
        <div className="flex justify-center" data-testid="epapp-personel-visual">
          <img
            src={ao("personel").image || "/assets/eorder-personel.png"}
            alt="eOrder personel uygulaması — sipariş listesi, ana menü ve hızlı menü ekranları"
            className="h-auto w-full max-w-[455px] object-contain"
            loading="lazy"
            data-testid="epapp-personel-image"
          />
        </div>
      </FeatureRow>

      <FeatureRow
        num="06"
        title={ao("admin").title || "Admin Panel"}
        desc={ao("admin").desc || "Sipariş, ciro, personel, geciken sipariş, ürün ve mağaza yönetimi. Tüm raporlar tek panelde."}
        hidden={ao("admin").visible === false}
        reverse
        testId="epapp-feature-admin"
      >
        <div className="flex justify-center" data-testid="epapp-admin-visual">
          <img
            src={ao("admin").image || "/assets/eorder-admin.png"}
            alt="eOrder admin paneli — sipariş, ürün, stok ve kullanıcı yönetim ekranları"
            className="h-auto w-full max-w-[465px] object-contain"
            loading="lazy"
            data-testid="epapp-admin-image"
          />
        </div>
      </FeatureRow>

      <FeatureRow
        num="07"
        title={ao("subeler").title || "Bir şubeden yüzlerce şubeye."}
        desc={ao("subeler").desc || "Çoklu şube yapısı merkezi yönetim ekranından izlenir; her şubenin performansı anlık takip edilir."}
        hidden={ao("subeler").visible === false}
        testId="epapp-feature-branches"
      >
        <div className="flex justify-center" data-testid="epapp-branches-visual">
          <img
            src={ao("subeler").image || "/assets/eorder-dashboard.png"}
            alt="eOrder merkezi yönetim paneli — toplam sipariş, mağaza ve kullanıcı takibi ile son işlemler tablosu"
            className="h-auto w-full object-contain lg:scale-[1.12]"
            loading="lazy"
            data-testid="epapp-branches-image"
          />
        </div>
      </FeatureRow>

      <Reveal>
        <div className="grid items-center gap-8 rounded-[2rem] border border-line bg-mist p-10 md:p-14 lg:grid-cols-[1fr_auto]" data-testid="epapp-epgo-band">
          <div>
            <img src={LOGOS.epgo} alt="EPgo logosu" className="h-7 w-auto object-contain" loading="lazy" />
            <h3 className="mt-5 text-3xl font-bold tracking-tight text-ink md:text-4xl">Siparişler EPgo'ya yönlendirilebilir.</h3>
            <p className="mt-3 max-w-lg text-base text-mute">
              Dilediğiniz kanaldan gelen siparişlerin teslimatını EPgo operasyonuna devredin.
            </p>
          </div>
          <CTAButton to="/epgo" variant="dark" testId="epapp-epgo-cta">
            EPgo'yu Keşfet
          </CTAButton>
        </div>
      </Reveal>
    </div>
  </section>
  );
};

const References = () => (
  <section className="py-24 md:py-32" data-testid="epapp-references">
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <SectionHead eyebrow="REFERANSLAR" title="EPapp'e güvenen markalar." testId="epapp-references-heading" />
      <div className="mt-14">
        <CaseCards solution="epapp" />
      </div>
    </div>
  </section>
);

const Quote = () => (
  <section id="teklif" className="scroll-mt-24 bg-mist py-24 md:py-32" data-testid="epapp-quote">
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
      <Seo page="epapp"
        title="EPapp — Çok Şubeli İşletmeler İçin Dijital Satış Altyapısı | Epersonel"
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
      <BrandChannel />
      <References />
      <Quote />
    </>
  );
}
