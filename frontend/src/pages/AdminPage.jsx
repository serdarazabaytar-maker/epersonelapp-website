import { useCallback, useEffect, useState } from "react";
import {
  LayoutDashboard, Inbox, Home, Layers, Star, Info, Mail, Image as ImageIcon,
  Settings2, LogOut, Loader2, Menu, X,
} from "lucide-react";
import Seo from "@/components/Seo";
import { LOGOS } from "@/data/site";
import { api, TOKEN_KEY } from "@/components/admin/adminApi";
import { LoginScreen } from "@/components/admin/LoginScreen";
import { Dashboard } from "@/components/admin/Dashboard";
import { LeadsManager } from "@/components/admin/LeadsManager";
import { ReferencesManager } from "@/components/admin/ReferencesManager";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { ContentEditor } from "@/components/admin/ContentEditor";
import {
  HOME_SCHEMA, STEPS_SCHEMA, EP_SCHEMA, EPAPP_SCHEMA, EPFOOD_SCHEMA, EPGO_SCHEMA,
  ABOUT_SCHEMA, CONTACT_SCHEMA, SEO_SCHEMA, BRAND_SCHEMA, FOOTER_SCHEMA,
} from "@/components/admin/schemas";

const MENU = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "talepler", label: "Talepler", icon: Inbox },
  { id: "anasayfa", label: "Ana Sayfa", icon: Home },
  { id: "cozumler", label: "Çözümler", icon: Layers },
  { id: "referanslar", label: "Referanslar", icon: Star },
  { id: "hakkimizda", label: "Hakkımızda", icon: Info },
  { id: "iletisim", label: "İletişim", icon: Mail },
  { id: "medya", label: "Medya", icon: ImageIcon },
  { id: "seo", label: "SEO / Ayarlar", icon: Settings2 },
];

const SOLUTION_TABS = [
  { id: "ep", label: "EP", schema: EP_SCHEMA },
  { id: "epapp", label: "EPapp", schema: EPAPP_SCHEMA },
  { id: "epfood", label: "EPfood", schema: EPFOOD_SCHEMA },
  { id: "epgo", label: "EPgo", schema: EPGO_SCHEMA },
];

const HOME_TABS = [
  { id: "genel", label: "Genel", schema: HOME_SCHEMA },
  { id: "adimlar", label: "4 Adım Bölümü", schema: STEPS_SCHEMA },
];

const SEO_TABS = [
  { id: "seo", label: "SEO & Genel Ayarlar", schema: SEO_SCHEMA },
  { id: "marka", label: "Marka Assetleri", schema: BRAND_SCHEMA },
  { id: "footer", label: "Footer", schema: FOOTER_SCHEMA },
];

const SubTabs = ({ tabs, active, onChange, testId }) => (
  <div className="mb-6 flex w-fit max-w-full gap-1.5 overflow-x-auto rounded-full border border-line bg-white p-1.5" data-testid={testId}>
    {tabs.map((t) => (
      <button
        key={t.id}
        type="button"
        onClick={() => onChange(t.id)}
        data-testid={`${testId}-${t.id}`}
        className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
          active === t.id ? "bg-ink text-white" : "text-mute hover:text-ink"
        }`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

const Shell = ({ user, onLogout }) => {
  const [menu, setMenu] = useState("dashboard");
  const [drawer, setDrawer] = useState(false);
  const [solutionTab, setSolutionTab] = useState("ep");
  const [homeTab, setHomeTab] = useState("genel");
  const [seoTab, setSeoTab] = useState("seo");

  const go = (id) => {
    setMenu(id);
    setDrawer(false);
    window.scrollTo({ top: 0 });
  };

  const activeLabel = MENU.find((m) => m.id === menu)?.label;

  const nav = (
    <nav className="flex h-full flex-col" data-testid="admin-nav">
      <div className="flex h-16 items-center gap-3 border-b border-line px-5">
        <img src={LOGOS.epersonel} alt="Epersonel" className="h-6 w-auto object-contain" />
        <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mute">Panel</span>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        {MENU.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => go(m.id)}
            data-testid={`admin-menu-${m.id}`}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
              menu === m.id ? "bg-ink text-white" : "text-mute hover:bg-mist hover:text-ink"
            }`}
          >
            <m.icon className="h-4 w-4 shrink-0" />
            {m.label}
          </button>
        ))}
      </div>
      <div className="border-t border-line p-3">
        <p className="truncate px-4 pb-2 text-xs font-semibold text-mute">{user.email}</p>
        <button
          type="button"
          onClick={onLogout}
          data-testid="admin-logout"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-mute transition-colors hover:bg-mist hover:text-ink"
        >
          <LogOut className="h-4 w-4" /> Çıkış Yap
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-mist" data-testid="admin-panel">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-white lg:block">{nav}</aside>

      {/* Mobil üst bar + drawer */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-white px-5 lg:hidden">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setDrawer(true)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink" aria-label="Menüyü aç" data-testid="admin-mobile-menu-btn">
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-bold text-ink">{activeLabel}</span>
        </div>
        <img src={LOGOS.epersonel} alt="Epersonel" className="h-5 w-auto object-contain" />
      </div>
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" data-testid="admin-mobile-drawer">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl">
            <button type="button" onClick={() => setDrawer(false)} className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line text-mute" aria-label="Menüyü kapat">
              <X className="h-4 w-4" />
            </button>
            {nav}
          </aside>
        </div>
      )}

      {/* İçerik */}
      <main className="px-5 py-8 md:px-8 lg:ml-64">
        <div className="mx-auto max-w-5xl">
          {menu === "dashboard" && <Dashboard onNavigate={go} />}
          {menu === "talepler" && <LeadsManager onLogout={onLogout} />}
          {menu === "anasayfa" && (
            <>
              <SubTabs tabs={HOME_TABS} active={homeTab} onChange={setHomeTab} testId="admin-home-tab" />
              <ContentEditor key={homeTab} schema={HOME_TABS.find((t) => t.id === homeTab).schema} />
            </>
          )}
          {menu === "cozumler" && (
            <>
              <SubTabs tabs={SOLUTION_TABS} active={solutionTab} onChange={setSolutionTab} testId="admin-solution-tab" />
              <ContentEditor key={solutionTab} schema={SOLUTION_TABS.find((t) => t.id === solutionTab).schema} />
            </>
          )}
          {menu === "referanslar" && <ReferencesManager api={api} />}
          {menu === "hakkimizda" && <ContentEditor schema={ABOUT_SCHEMA} />}
          {menu === "iletisim" && <ContentEditor schema={CONTACT_SCHEMA} />}
          {menu === "medya" && <MediaLibrary />}
          {menu === "seo" && (
            <>
              <SubTabs tabs={SEO_TABS} active={seoTab} onChange={setSeoTab} testId="admin-seo-tab" />
              <ContentEditor key={seoTab} schema={SEO_TABS.find((t) => t.id === seoTab).schema} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default function AdminPage() {
  const [auth, setAuth] = useState(null); // null: kontrol ediliyor, false: giriş yok, object: kullanıcı

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (!t) {
      setAuth(false);
      return;
    }
    api
      .get("/auth/me")
      .then((r) => setAuth(r.data))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setAuth(false);
      });
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* cookie temizliği best-effort */
    }
    localStorage.removeItem(TOKEN_KEY);
    setAuth(false);
  }, []);

  return (
    <>
      <Seo title="Yönetim Paneli | Epersonel" siteName="Epersonel" />
      {auth === null ? (
        <div className="flex min-h-screen items-center justify-center bg-mist">
          <Loader2 className="h-6 w-6 animate-spin text-mute" />
        </div>
      ) : auth === false ? (
        <LoginScreen onLogin={setAuth} />
      ) : (
        <Shell user={auth} onLogout={logout} />
      )}
    </>
  );
}
