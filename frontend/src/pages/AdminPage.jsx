import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, Mail, LogOut, Search, ChevronDown, ChevronLeft, ChevronRight, Inbox, Loader2, Plus, Download, UserPlus } from "lucide-react";
import Seo from "@/components/Seo";
import { LOGOS, BRANCH_OPTIONS } from "@/data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "ep_admin_token";

const api = axios.create({ baseURL: API });
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem(TOKEN_KEY);
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

const formatApiErrorDetail = (detail) => {
  if (detail == null) return "Bir hata oluştu. Tekrar deneyin.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
};

const STATUSES = {
  new: { label: "Yeni", cls: "bg-brand text-ink" },
  contacted: { label: "İletişime Geçildi", cls: "border border-line bg-white text-ink" },
  meeting_planned: { label: "Görüşme Planlandı", cls: "bg-ink text-white" },
  offer_sent: { label: "Teklif Verildi", cls: "bg-mist text-ink border border-line" },
  won: { label: "Olumlu", cls: "bg-ink text-white" },
  lost: { label: "Olumsuz", cls: "bg-mist text-mute" },
};

const TYPE_LABELS = {
  gorusme: "Görüşme Talebi",
  teklif: "Teklif Talebi",
  iletisim: "İletişim Formu",
  teslimat: "EPkurye Teslimat Teklifi",
  basvuru: "EP Başvuru",
};

const SOLUTION_LABELS = { ep: "EP", epapp: "EPapp", epkurye: "EPkurye", epfood: "EPfood" };

const typeLabel = (lead) => {
  if (lead.form_type === "teklif" && lead.source_page === "/epfood") return "EPfood Teklif Talebi";
  if (lead.form_type === "teklif" && lead.source_page === "/epapp") return "EPapp Teklif Talebi";
  return TYPE_LABELS[lead.form_type] || lead.form_type;
};

const fmtDate = (iso) =>
  new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const trPhoneLink = (phone) => {
  const d = (phone || "").replace(/\D/g, "");
  return d.startsWith("0") ? `9${d}` : d;
};

const selectCls =
  "rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink focus:border-ink focus:outline-none";

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password }, { withCredentials: true });
      localStorage.setItem(TOKEN_KEY, data.access_token);
      onLogin(data.user);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail) || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-5" data-testid="admin-login">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-line bg-white p-8 shadow-[0_24px_80px_rgba(16,17,16,0.08)]"
      >
        <img src={LOGOS.epersonel} alt="Epersonel" className="h-7 w-auto object-contain" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink">Talep Paneli</h1>
        <p className="mt-1 text-sm text-mute">Devam etmek için giriş yapın.</p>
        <div className="mt-7 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink" htmlFor="admin-email">E-posta</label>
            <input
              id="admin-email"
              data-testid="admin-login-email-input"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-line px-4 py-3 text-[15px] focus:border-ink focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-ink" htmlFor="admin-password">Şifre</label>
            <input
              id="admin-password"
              data-testid="admin-login-password-input"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line px-4 py-3 text-[15px] focus:border-ink focus:outline-none"
            />
          </div>
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600" role="alert" data-testid="admin-login-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Giriş Yap"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

const LeadDetail = ({ lead, team, assignableTeam, onStatusChange, onAssign, onNoteAdded }) => {
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const tel = trPhoneLink(lead.phone);

  const addNote = async () => {
    if (!note.trim()) return;
    setSaving(true);
    try {
      const { data } = await api.post(`/admin/leads/${lead.id}/notes`, { text: note.trim() });
      onNoteAdded(lead.id, data);
      setNote("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
      data-testid={`lead-detail-${lead.id}`}
    >
      <div className="grid gap-8 border-t border-line bg-mist px-6 py-6 md:grid-cols-2">
        <div className="space-y-3 text-sm">
          {[
            ["Yetkili", lead.contact_name],
            ["E-posta", lead.email],
            ["Telefon", lead.phone],
            ["Şube Sayısı", lead.branch_count],
            ["Atanan Kişi", lead.assignee_name || "Atanmamış"],
            ["Sayfa", lead.source_page || "—"],
            ["Tarih", fmtDate(lead.created_at)],
            lead.meeting_type ? ["Görüşme Türü", lead.meeting_type] : null,
            lead.delivery_type ? ["Teslimat İhtiyacı", lead.delivery_type] : null,
            lead.daily_orders ? ["Günlük Tahmini Sipariş", lead.daily_orders] : null,
          ]
            .filter(Boolean)
            .map(([l, v]) => (
              <p key={l} className="flex gap-3">
                <span className="w-44 shrink-0 font-semibold text-mute">{l}</span>
                <span className="font-semibold text-ink">{v}</span>
              </p>
            ))}
          {lead.message && (
            <div className="rounded-2xl border border-line bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-mute">Mesaj / İhtiyaç</p>
              <p className="mt-2 leading-relaxed text-ink">{lead.message}</p>
            </div>
          )}
          <div className="rounded-2xl border border-line bg-white p-4" data-testid={`assign-history-${lead.id}`}>
            <p className="text-xs font-bold uppercase tracking-wider text-mute">Atama Geçmişi</p>
            <div className="mt-2 space-y-1.5">
              {(lead.assignment_history || []).length === 0 && <p className="text-sm text-mute">Henüz atama yapılmadı.</p>}
              {[...(lead.assignment_history || [])].reverse().map((h, i) => (
                <p key={`${h.at}-${i}`} className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-ink">{h.member_name || "Atanmamış"}</span>
                  <span className="text-[11px] text-mute">{fmtDate(h.at)}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={lead.status}
              onChange={(e) => onStatusChange(lead.id, e.target.value)}
              data-testid={`status-select-${lead.id}`}
              className={selectCls}
              aria-label="Talep durumu"
            >
              {Object.entries(STATUSES).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
            <select
              value={lead.assignee || ""}
              onChange={(e) => onAssign(lead.id, e.target.value || null)}
              data-testid={`assign-select-${lead.id}`}
              className={selectCls}
              aria-label="Atanan kişi"
            >
              <option value="">Atanmamış</option>
              {assignableTeam.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <a href={`tel:+${tel}`} data-testid={`action-call-${lead.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white">
              <Phone className="h-3.5 w-3.5" /> Ara
            </a>
            <a href={`https://wa.me/${tel}`} target="_blank" rel="noreferrer" data-testid={`action-whatsapp-${lead.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-xs font-bold text-ink">
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <a href={`mailto:${lead.email}`} data-testid={`action-email-${lead.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2.5 text-xs font-bold text-ink">
              <Mail className="h-3.5 w-3.5" /> E-posta
            </a>
          </div>
          {team.length === 0 && (
            <p className="mt-3 flex items-center gap-2 text-xs text-mute" data-testid="team-empty-note">
              <UserPlus className="h-3.5 w-3.5" />
              Ekip üyesi henüz tanımlı değil — atama listesi, üyeler eklendiğinde burada görünür.
            </p>
          )}
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-mute">Notlar</p>
            <div className="mt-3 space-y-2">
              {(lead.notes || []).map((n) => (
                <div key={n.id} className="rounded-xl border border-line bg-white p-3 text-sm" data-testid={`note-${n.id}`}>
                  <p className="text-ink">{n.text}</p>
                  <p className="mt-1 text-[11px] text-mute">{fmtDate(n.at)}</p>
                </div>
              ))}
              {(lead.notes || []).length === 0 && <p className="text-sm text-mute">Henüz not yok.</p>}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Not ekle..."
                data-testid={`note-input-${lead.id}`}
                className="flex-1 rounded-xl border border-line bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
              />
              <button
                type="button"
                onClick={addNote}
                disabled={saving || !note.trim()}
                data-testid={`note-add-${lead.id}`}
                className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50"
              >
                <Plus className="h-3.5 w-3.5" /> Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Panel = ({ user, onLogout }) => {
  const [leads, setLeads] = useState([]);
  const [team, setTeam] = useState([]);
  const [kpis, setKpis] = useState({ new: 0, meeting_planned: 0, offer_sent: 0, won: 0, unassigned: 0 });
  const [filters, setFilters] = useState({ status: "", solution: "", form_type: "", branch_count: "", period: "", assignee: "" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const debounce = useRef(null);

  const activeParams = useCallback(() => {
    const params = {};
    Object.entries(filters).forEach(([k, v]) => v && (params[k] = v));
    if (search.trim()) params.q = search.trim();
    return params;
  }, [filters, search]);

  const load = useCallback(async () => {
    const { data } = await api.get("/admin/leads", { params: { ...activeParams(), page, page_size: pageSize } });
    setLeads(data.items);
    setKpis(data.kpis);
    setTotal(data.total);
  }, [activeParams, page, pageSize]);

  useEffect(() => {
    setLoading(true);
    load()
      .catch((e) => {
        if (e.response?.status === 401) onLogout();
      })
      .finally(() => setLoading(false));
  }, [load, onLogout]);

  useEffect(() => {
    api
      .get("/admin/team")
      .then((r) => setTeam(r.data.items))
      .catch(() => {});
  }, []);

  const applyFilter = (key, value) => {
    setPage(1);
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const onSearch = (v) => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setPage(1);
      setSearch(v);
    }, 350);
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      const { data } = await api.get("/admin/leads/export", { params: activeParams(), responseType: "blob" });
      const url = URL.createObjectURL(new Blob([data], { type: "text/csv;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "epersonel-talepler.csv";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  const changeStatus = async (id, status) => {
    await api.patch(`/admin/leads/${id}`, { status });
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    load();
  };

  const assignLead = async (id, memberId) => {
    const { data } = await api.patch(`/admin/leads/${id}/assign`, { member_id: memberId });
    setLeads((ls) =>
      ls.map((l) =>
        l.id === id
          ? { ...l, assignee: data.assignee, assignee_name: data.assignee_name, assignment_history: [...(l.assignment_history || []), data.history_entry] }
          : l
      )
    );
    load();
  };

  const noteAdded = (id, note) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, notes: [...(l.notes || []), note] } : l)));
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Atama listelerinde yalnızca aktif ve atanabilir üyeler görünür
  const assignableTeam = team.filter((m) => m.active !== false && m.assignable !== false);

  const KPI_CARDS = [
    { key: "new", label: "Yeni Talepler", testId: "kpi-new" },
    { key: "meeting_planned", label: "Görüşme Bekleyenler", testId: "kpi-meeting" },
    { key: "offer_sent", label: "Teklif Verilenler", testId: "kpi-offer" },
    { key: "won", label: "Olumlu Talepler", testId: "kpi-won" },
    { key: "unassigned", label: "Atanmamış Talepler", testId: "kpi-unassigned" },
  ];

  return (
    <div className="min-h-screen bg-mist" data-testid="admin-panel">
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-4">
            <img src={LOGOS.epersonel} alt="Epersonel" className="h-6 w-auto object-contain" />
            <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold text-white">Talep Paneli</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-semibold text-mute sm:block">{user.email}</span>
            <button
              type="button"
              onClick={onLogout}
              data-testid="admin-logout"
              className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-ink"
            >
              <LogOut className="h-4 w-4" /> Çıkış
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {KPI_CARDS.map((k) => (
            <div key={k.key} className="rounded-3xl border border-line bg-white p-6" data-testid={k.testId}>
              <p className="text-xs font-bold uppercase tracking-wider text-mute">{k.label}</p>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-ink">{kpis[k.key]}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5 rounded-3xl border border-line bg-white p-4" data-testid="admin-filters">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
            <input
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Firma, yetkili, telefon veya e-posta ara"
              data-testid="admin-search-input"
              className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-sm font-medium focus:border-ink focus:outline-none"
            />
          </div>
          <select value={filters.solution} onChange={(e) => applyFilter("solution", e.target.value)} className={selectCls} data-testid="filter-solution" aria-label="Çözüm filtresi">
            <option value="">Tüm Çözümler</option>
            {Object.entries(SOLUTION_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select value={filters.form_type} onChange={(e) => applyFilter("form_type", e.target.value)} className={selectCls} data-testid="filter-type" aria-label="Talep tipi filtresi">
            <option value="">Tüm Tipler</option>
            {Object.entries(TYPE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select value={filters.status} onChange={(e) => applyFilter("status", e.target.value)} className={selectCls} data-testid="filter-status" aria-label="Durum filtresi">
            <option value="">Tüm Durumlar</option>
            {Object.entries(STATUSES).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <select value={filters.assignee} onChange={(e) => applyFilter("assignee", e.target.value)} className={selectCls} data-testid="filter-assignee" aria-label="Atanan kişi filtresi">
            <option value="">Tüm Atamalar</option>
            <option value="unassigned">Atanmamış</option>
            {assignableTeam.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <select value={filters.branch_count} onChange={(e) => applyFilter("branch_count", e.target.value)} className={selectCls} data-testid="filter-branch" aria-label="Şube sayısı filtresi">
            <option value="">Tüm Şube Sayıları</option>
            {BRANCH_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <select value={filters.period} onChange={(e) => applyFilter("period", e.target.value)} className={selectCls} data-testid="filter-period" aria-label="Tarih filtresi">
            <option value="">Tüm Zamanlar</option>
            <option value="today">Bugün</option>
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün</option>
          </select>
          <button
            type="button"
            onClick={exportCsv}
            disabled={exporting}
            data-testid="export-csv-button"
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            CSV İndir
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-white" data-testid="leads-list">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-mute">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="leads-empty">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-mute">
                <Inbox className="h-6 w-6" />
              </span>
              <p className="mt-4 font-bold text-ink">Talep bulunamadı</p>
              <p className="mt-1 text-sm text-mute">Filtreleri değiştirin veya yeni talepleri bekleyin.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {leads.map((lead) => {
                const st = STATUSES[lead.status] || STATUSES.new;
                const open = openId === lead.id;
                return (
                  <li key={lead.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : lead.id)}
                      data-testid={`lead-row-${lead.id}`}
                      aria-expanded={open}
                      className="grid w-full grid-cols-2 items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-mist md:grid-cols-[1.5fr_1fr_1fr_auto_auto]"
                    >
                      <div>
                        <p className="font-bold text-ink">{lead.business_name}</p>
                        <p className="text-sm text-mute">{lead.contact_name}</p>
                      </div>
                      <div className="hidden md:block">
                        <span className="rounded-full border border-line bg-mist px-3 py-1 text-[11px] font-bold text-ink">
                          {SOLUTION_LABELS[lead.solution] || "—"}
                        </span>
                        <p className="mt-1.5 text-xs text-mute">{typeLabel(lead)}</p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm font-semibold text-mute">{fmtDate(lead.created_at)}</p>
                        <p className="mt-1 text-xs font-semibold text-mute" data-testid={`lead-assignee-${lead.id}`}>
                          {lead.assignee_name ? `Atanan: ${lead.assignee_name}` : "Atanmamış"}
                        </p>
                      </div>
                      <span className={`justify-self-start rounded-full px-3 py-1.5 text-[11px] font-bold ${st.cls}`} data-testid={`lead-status-${lead.id}`}>
                        {st.label}
                      </span>
                      <ChevronDown className={`h-4 w-4 justify-self-end text-mute transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && <LeadDetail lead={lead} team={team} assignableTeam={assignableTeam} onStatusChange={changeStatus} onAssign={assignLead} onNoteAdded={noteAdded} />}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3" data-testid="pagination">
          <p className="text-sm text-mute">
            Toplam <span className="font-bold text-ink" data-testid="pagination-total">{total}</span> talep
          </p>
          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className={selectCls}
              data-testid="page-size-select"
              aria-label="Sayfa başına kayıt"
            >
              <option value={25}>25 kayıt</option>
              <option value={50}>50 kayıt</option>
              <option value={100}>100 kayıt</option>
            </select>
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              data-testid="page-prev"
              aria-label="Önceki sayfa"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-sm font-bold text-ink" data-testid="page-info">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              data-testid="page-next"
              aria-label="Sonraki sayfa"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
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
      <Seo title="Talep Paneli | Epersonel" siteName="Epersonel" />
      {auth === null ? (
        <div className="flex min-h-screen items-center justify-center bg-mist">
          <Loader2 className="h-6 w-6 animate-spin text-mute" />
        </div>
      ) : auth === false ? (
        <LoginScreen onLogin={setAuth} />
      ) : (
        <Panel user={auth} onLogout={logout} />
      )}
    </>
  );
}
