import { motion, useReducedMotion } from "framer-motion";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CTAButton } from "@/components/CTAButton";

const MODEL = [
  { n: "01", title: "Analiz ve Planlama", desc: "İşletmenizin yapısını, kanallarını ve hedeflerini analiz eder; size uygun modeli birlikte planlarız." },
  { n: "02", title: "Kurulum ve Entegrasyon", desc: "Mağaza açılışları, entegrasyonlar, ürün ve menü kurulumları tarafımızca tamamlanır." },
  { n: "03", title: "Eğitim ve Devreye Alma", desc: "Ekibinizi uygulamalarla eğitir, operasyonu birlikte devreye alırız." },
  { n: "04", title: "Takip ve Geliştirme", desc: "Sistem ve operasyon süreçlerini sürekli izler, iyileştirir ve geliştiririz." },
];

export default function HakkimizdaPage() {
  const reduce = useReducedMotion();
  return (
    <>
      <Seo
        title="Hakkımızda | Epersonel"
        siteName="Epersonel"
        description="Teknoloji kuruyoruz, operasyonu birlikte yürütüyoruz. Epersonel çalışma modeli: analiz, kurulum, eğitim ve sürekli geliştirme."
      />
      <section className="relative overflow-hidden pb-24 pt-36 md:pt-48" data-testid="about-hero">
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
            <span className="inline-block h-2 w-2 rounded-[3px] bg-brand" aria-hidden="true" />
            Hakkımızda
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl" data-testid="about-title">
            {["Teknoloji kuruyoruz.", "Operasyonu birlikte yürütüyoruz."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
              Epersonel; işletmelerin dijital satış kanallarını kuran, birbirine bağlayan, sipariş operasyonlarını
              yöneten ve gerektiğinde teslimatı da üstlenen bir teknoloji + operasyon şirketidir. Yazılımı teslim edip
              çekilmiyoruz; operasyonun içinde kalıyoruz.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-24 md:py-32" data-testid="about-model">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHead eyebrow="ÇALIŞMA MODELİ" title="Nasıl çalışıyoruz?" testId="about-model-heading" />
          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {MODEL.map((m, i) => (
              <Reveal key={m.n} delay={(i % 2) * 0.1}>
                <div className="border-t-2 border-ink pt-8" data-testid={`about-step-${i}`}>
                  <span className="text-6xl font-extrabold tracking-tight text-transparent md:text-7xl" style={{ WebkitTextStroke: "1.5px #101110" }}>
                    {m.n}
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink md:text-3xl">{m.title}</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-mute md:text-lg">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32" data-testid="about-cta">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-line bg-white p-10 md:flex-row md:items-center md:p-14">
              <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
                İşletmeniz için doğru modeli birlikte belirleyelim.
              </h2>
              <CTAButton to="/iletisim" testId="about-cta-button">
                Görüşme Planla
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
