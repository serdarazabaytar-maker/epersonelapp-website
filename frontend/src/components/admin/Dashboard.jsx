import { useEffect, useState } from "react";
import { ArrowRight, FileEdit, Image as ImageIcon, LayoutDashboard, Loader2, Star, Users } from "lucide-react";
import { api, fmtDate } from "./adminApi";

const QUICK_ACTIONS = [
  { label: "Yeni Referans Ekle", menu: "referanslar", testId: "quick-new-reference" },
  { label: "Ana Sayfayı Düzenle", menu: "anasayfa", testId: "quick-edit-home" },
  { label: "Çözüm Sayfasını Düzenle", menu: "cozumler", testId: "quick-edit-solution" },
  { label: "Medya Yükle", menu: "medya", testId: "quick-upload-media" },
];

export const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then((r) => setStats(r.data)).catch(() => {});
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-mute" />
      </div>
    );
  }

  const cards = [
    { label: "Toplam Referans", value: stats.total_refs, icon: Star, testId: "stat-total-refs" },
    { label: "Aktif Referans", value: stats.active_refs, icon: Users, testId: "stat-active-refs" },
    { label: "Toplam Görsel / Medya", value: stats.media_count, icon: ImageIcon, testId: "stat-media" },
    { label: "Son Güncelleme", value: fmtDate(stats.last_update), icon: FileEdit, testId: "stat-last-update", small: true },
  ];

  return (
    <div data-testid="admin-dashboard">
      <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-ink">
        <LayoutDashboard className="h-5 w-5" /> Dashboard
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.testId} className="rounded-3xl border border-line bg-white p-6" data-testid={c.testId}>
            <c.icon className="h-5 w-5 text-mute" />
            <p className={`mt-3 font-extrabold tracking-tight text-ink ${c.small ? "text-base leading-snug" : "text-4xl"}`}>{c.value}</p>
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-mute">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-line bg-white p-6" data-testid="dashboard-recent-edits">
          <h3 className="text-[15px] font-bold text-ink">Son Düzenlenen İçerikler</h3>
          <ul className="mt-4 space-y-2.5">
            {stats.recent_edits.map((e) => (
              <li key={e.key} className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3">
                <span className="flex items-center gap-2.5 text-sm font-bold text-ink">
                  {e.label}
                  {e.has_draft && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">Taslak</span>}
                </span>
                <span className="text-xs font-semibold text-mute">{fmtDate(e.updated_at)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-line bg-white p-6" data-testid="dashboard-recent-refs">
          <h3 className="text-[15px] font-bold text-ink">Son Eklenen Referanslar</h3>
          <ul className="mt-4 space-y-2.5">
            {stats.recent_refs.length === 0 ? (
              <li className="text-sm font-semibold text-mute">Henüz referans yok.</li>
            ) : (
              stats.recent_refs.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3">
                  <span className="text-sm font-bold text-ink">{r.name}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${r.active ? "bg-brand text-ink" : "bg-mist text-mute"}`}>
                    {r.active ? "Aktif" : "Pasif"}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-line bg-white p-6" data-testid="dashboard-quick-actions">
        <h3 className="text-[15px] font-bold text-ink">Hızlı Bağlantılar</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.testId}
              type="button"
              onClick={() => onNavigate(a.menu)}
              data-testid={a.testId}
              className="group flex items-center justify-between rounded-2xl border border-line px-5 py-4 text-left text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_10px_28px_rgba(16,17,16,0.08)]"
            >
              {a.label}
              <ArrowRight className="h-4 w-4 text-mute transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
