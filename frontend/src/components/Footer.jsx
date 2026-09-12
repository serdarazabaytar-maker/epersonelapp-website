import { Link } from "react-router-dom";
import { Linkedin, Instagram, Youtube } from "lucide-react";
import { LOGOS, SOLUTIONS } from "@/data/site";
import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";

const COMPANY_LINKS = [
  { label: "Hakkımızda", to: "/hakkimizda" },
  { label: "Referanslar", to: "/referanslar" },
  { label: "İletişim", to: "/iletisim" },
];

const LEGAL_LINKS = [
  { label: "KVKK", to: "/kvkk" },
  { label: "Gizlilik Politikası", to: "/gizlilik-politikasi" },
  { label: "Çerez Politikası", to: "/cerez-politikasi" },
];

export const Footer = () => (
  <footer data-testid="site-footer">
    <div className="bg-coal text-white">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">
              İşletmeniz için doğru çözümü{" "}
              <span className="relative inline-block">
                birlikte
                <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-brand" aria-hidden="true" />
              </span>{" "}
              belirleyelim.
            </h2>
            <CTAButton to="/iletisim" testId="footer-cta" className="shrink-0">
              Görüşme Planla
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </div>

    <div className="border-t border-line bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" aria-label="Epersonel ana sayfa">
              <img src={LOGOS.epersonel} alt="Epersonel" className="h-7 w-auto object-contain" loading="lazy" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
              Dijital satış kanallarını kuran, sipariş operasyonunu yöneten ve teslimatı üstlenen teknoloji + operasyon şirketi.
            </p>
          </div>
          <nav aria-label="Çözümler">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-mute">Çözümler</p>
            <ul className="mt-5 space-y-3">
              {SOLUTIONS.map((s) => (
                <li key={s.id}>
                  <Link to={s.path} data-testid={`footer-solution-${s.id}`} className="text-[15px] font-semibold text-ink transition-colors hover:text-mute">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Şirket">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-mute">Şirket</p>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[15px] font-semibold text-ink transition-colors hover:text-mute">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Yasal">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-mute">Yasal</p>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[15px] font-semibold text-ink transition-colors hover:text-mute">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Sosyal hesap bağlantıları yayına alındığında eklenecek */}
            <div className="mt-8 flex gap-2">
              {[Linkedin, Instagram, Youtube].map((Icon, i) => (
                <span
                  key={i}
                  data-testid={`footer-social-${i}`}
                  title="Yakında"
                  className="flex h-10 w-10 cursor-default items-center justify-center rounded-full border border-line bg-white text-mute"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </nav>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-8 text-sm text-mute md:flex-row md:items-center">
          <p>© 2026 Epersonel. Tüm hakları saklıdır.</p>
          <p>Teknoloji + Operasyon</p>
        </div>
      </div>
    </div>
  </footer>
);
