import axios from "axios";
import IL_ILCE from "@/data/il-ilce.json";

export const ILLER = Object.keys(IL_ILCE);

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
export const TOKEN_KEY = "ep_admin_token";

export const api = axios.create({ baseURL: API });
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem(TOKEN_KEY);
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export const formatApiErrorDetail = (detail) => {
  if (detail == null) return "Bir hata oluştu. Tekrar deneyin.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
};

export const STATUSES = {
  new: { label: "Yeni", cls: "bg-brand text-ink" },
  contacted: { label: "İletişime Geçildi", cls: "border border-line bg-white text-ink" },
  meeting_planned: { label: "Görüşme Planlandı", cls: "bg-ink text-white" },
  offer_sent: { label: "Teklif Verildi", cls: "bg-mist text-ink border border-line" },
  won: { label: "Olumlu", cls: "bg-ink text-white" },
  lost: { label: "Olumsuz", cls: "bg-mist text-mute" },
};

export const TYPE_LABELS = {
  gorusme: "Görüşme Talebi",
  teklif: "Teklif Talebi",
  iletisim: "İletişim Formu",
  teslimat: "EPgo Teslimat Teklifi",
  basvuru: "EP Başvuru",
};

export const SOLUTION_LABELS = { ep: "EP", epapp: "EPapp", epfood: "EPfood", epgo: "EPgo" };

export const typeLabel = (lead) => {
  if (lead.form_type === "teklif" && lead.source_page === "/epfood") return "EPfood Teklif Talebi";
  if (lead.form_type === "teklif" && lead.source_page === "/epapp") return "EPapp Teklif Talebi";
  return TYPE_LABELS[lead.form_type] || lead.form_type;
};

export const fmtDate = (iso) =>
  new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export const trPhoneLink = (phone) => {
  const d = (phone || "").replace(/\D/g, "");
  return d.startsWith("0") ? `9${d}` : d;
};

export const selectCls =
  "rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink focus:border-ink focus:outline-none";
