import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { LOGOS, NAV_LINKS, SOLUTIONS } from "@/data/site";

const MegaMenu = ({ onNavigate }) => (
  <div className="grid grid-cols-2 gap-2" data-testid="mega-menu">
    {SOLUTIONS.map((s) => (
      <Link
        key={s.id}
        to={s.path}
        onClick={onNavigate}
        data-testid={`mega-menu-${s.id}`}
        className="group rounded-2xl p-5 transition-colors duration-300 hover:bg-mist"
      >
        <img src={s.logo} alt={`${s.name} logosu`} className="h-6 w-auto object-contain object-left" loading="lazy" />
        <p className="mt-4 text-sm leading-snug text-mute">{s.tagline}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-ink">
          İncele
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    ))}
    <p className="col-span-2 mt-1 border-t border-line px-5 pt-4 text-xs leading-relaxed text-mute">
      ePKURYE, diğer tüm çözümlerin teslimat katmanı olarak da kullanılabilir.
    </p>
  </div>
);

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutions, setMobileSolutions] = useState(false);
  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || megaOpen ? "border-b border-line bg-white/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" aria-label="Epersonel ana sayfa" data-testid="header-logo">
          <img src={LOGOS.epersonel} alt="Epersonel" className="h-7 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          {NAV_LINKS.map((link) =>
            link.mega ? (
              <div key={link.label} className="relative" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  data-testid="nav-solutions-trigger"
                  aria-expanded={megaOpen}
                  onClick={() => setMegaOpen((v) => !v)}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-semibold text-ink transition-colors hover:bg-mist"
                >
                  {link.label}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-4"
                    >
                      <div className="rounded-3xl border border-line bg-white p-3 shadow-[0_24px_80px_rgba(16,17,16,0.12)]">
                        <MegaMenu />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full px-4 py-2 text-[15px] font-semibold text-ink transition-colors hover:bg-mist"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {/* Müşteri paneli yayına alındığında bağlanacak */}
          <span
            data-testid="header-login-link"
            className="cursor-default rounded-full px-4 py-2 text-[15px] font-semibold text-mute"
            title="Yakında"
          >
            Giriş Yap
          </span>
          <Link
            to="/iletisim"
            data-testid="header-cta"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-[15px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(var(--brand-rgb),0.4)]"
          >
            Görüşme Planla
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
          </Link>
        </div>

        <button
          type="button"
          data-testid="mobile-menu-toggle"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-white lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="space-y-1 px-5 py-6">
              <button
                type="button"
                data-testid="mobile-solutions-toggle"
                aria-expanded={mobileSolutions}
                onClick={() => setMobileSolutions((v) => !v)}
                className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-bold text-ink"
              >
                Çözümler
                <ChevronDown className={`h-5 w-5 transition-transform ${mobileSolutions ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileSolutions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 pb-2 pl-4">
                      {SOLUTIONS.map((s) => (
                        <Link
                          key={s.id}
                          to={s.path}
                          data-testid={`mobile-menu-${s.id}`}
                          className="flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-mist"
                        >
                          <img src={s.logo} alt={`${s.name} logosu`} className="h-5 w-auto object-contain object-left" loading="lazy" />
                          <span className="text-sm text-mute">{s.tagline}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {NAV_LINKS.filter((l) => !l.mega).map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block rounded-2xl px-4 py-3.5 text-lg font-bold text-ink transition-colors hover:bg-mist"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/iletisim"
                  data-testid="mobile-header-cta"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-semibold text-ink"
                >
                  Görüşme Planla
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
