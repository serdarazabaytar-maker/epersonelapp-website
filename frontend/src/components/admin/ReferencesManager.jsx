import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GripVertical, Loader2, Plus, Upload } from "lucide-react";
import { toast } from "sonner";

// Admin referans yönetimi — tek merkezi data; tüm public gösterimler (marquee, çözüm
// kartları, /referanslar) buradan beslenir. Logo upload object storage'a gider.
const SOLUTION_OPTIONS = [
  { id: "ep", name: "EP" },
  { id: "epapp", name: "EPapp" },
  { id: "epfood", name: "EPfood" },
  { id: "epgo", name: "EPgo" },
];

const VISIBILITY_OPTIONS = [
  { key: "show_marquee", label: "Ana sayfa marquee" },
  { key: "show_ep", label: "EP sayfası" },
  { key: "show_epapp", label: "EPapp sayfası" },
  { key: "show_epfood", label: "EPfood sayfası" },
  { key: "show_epgo", label: "EPgo sayfası" },
  { key: "show_references", label: "Referanslar sayfası" },
];

const EMPTY_FORM = {
  name: "",
  solutions: [],
  services: [],
  manager_name: "",
  manager_title: "",
  quote: "",
  show_marquee: true,
  show_ep: false,
  show_epapp: false,
  show_epfood: false,
  show_epgo: false,
  show_references: true,
  active: true,
  order: 0,
};

const inputCls =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-ink focus:border-ink focus:outline-none";
const labelCls = "mb-1.5 block text-xs font-bold text-ink";
const checkCls = "flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-xs font-bold text-ink has-[:checked]:border-ink has-[:checked]:bg-mist";

const Toggle = ({ label, checked, onChange, testId }) => (
  <label className={checkCls} data-testid={testId}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-black" />
    {label}
  </label>
);

const ReferenceForm = ({ api, initial, onSaved, onCancel }) => {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const isNew = !initial.id;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleSolution = (id) =>
    set("solutions", form.solutions.includes(id) ? form.solutions.filter((s) => s !== id) : [...form.solutions, id]);

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        order: Number(form.order) || 0,
        manager_name: form.manager_name || null,
        manager_title: form.manager_title || null,
        quote: form.quote || null,
        services: Array.isArray(form.services) ? form.services : String(form.services).split(","),
      };
      const { data } = isNew
        ? await api.post("/admin/references", payload)
        : await api.patch(`/admin/references/${initial.id}`, payload);
      onSaved(data);
    } catch (e) {
      setError(e.response?.data?.detail ? "Kaydedilemedi — alanları kontrol edin." : "Bağlantı hatası");
    } finally {
      setSaving(false);
    }
  };

  const uploadLogo = async (file) => {
    if (!file || isNew) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post(`/admin/references/${initial.id}/logo`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSaved({ ...form, id: initial.id, logo_url: data.logo_url });
    } catch (e) {
      setError(e.response?.data?.detail || "Logo yüklenemedi");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4 grid gap-4 rounded-2xl border border-line bg-mist p-5 sm:grid-cols-2" data-testid="reference-form">
      <div>
        <label className={labelCls}>Marka Adı *</label>
        <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} data-testid="ref-name-input" />
      </div>
      <div>
        <label className={labelCls}>Sıralama</label>
        <input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} className={inputCls} data-testid="ref-order-input" />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Aldığı Çözümler</label>
        <div className="flex flex-wrap gap-2">
          {SOLUTION_OPTIONS.map((s) => (
            <Toggle
              key={s.id}
              label={s.name}
              checked={form.solutions.includes(s.id)}
              onChange={() => toggleSolution(s.id)}
              testId={`ref-solution-${s.id}`}
            />
          ))}
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Hizmetler (virgülle ayırın)</label>
        <input
          value={Array.isArray(form.services) ? form.services.join(", ") : form.services}
          onChange={(e) => set("services", e.target.value)}
          className={inputCls}
          placeholder="Pazaryeri Operasyonu, EP Uygulaması"
          data-testid="ref-services-input"
        />
      </div>
      <div>
        <label className={labelCls}>Yönetici Adı (opsiyonel)</label>
        <input value={form.manager_name || ""} onChange={(e) => set("manager_name", e.target.value)} className={inputCls} data-testid="ref-manager-input" />
      </div>
      <div>
        <label className={labelCls}>Yönetici Unvanı (opsiyonel)</label>
        <input value={form.manager_title || ""} onChange={(e) => set("manager_title", e.target.value)} className={inputCls} data-testid="ref-title-input" />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Kısa Yorum (opsiyonel, 1–2 cümle)</label>
        <textarea value={form.quote || ""} onChange={(e) => set("quote", e.target.value)} className={`${inputCls} min-h-[70px] resize-y`} data-testid="ref-quote-input" />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls}>Görünürlük</label>
        <div className="flex flex-wrap gap-2">
          {VISIBILITY_OPTIONS.map((v) => (
            <Toggle key={v.key} label={v.label} checked={!!form[v.key]} onChange={(val) => set(v.key, val)} testId={`ref-vis-${v.key}`} />
          ))}
          <Toggle label="Aktif" checked={form.active} onChange={(val) => set("active", val)} testId="ref-active" />
        </div>
      </div>
      {!isNew && (
        <div className="sm:col-span-2">
          <label className={labelCls}>Logo</label>
          <div className="flex items-center gap-4">
            {form.logo_url ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${form.logo_url}`}
                alt={`${form.name} logosu`}
                className="h-10 w-auto max-w-[140px] rounded-lg border border-line bg-white object-contain p-1.5"
                data-testid="ref-logo-preview"
              />
            ) : (
              <span className="rounded-lg border border-dashed border-line bg-white px-4 py-2.5 text-xs font-semibold text-mute">
                Logo yok
              </span>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white" data-testid="ref-logo-upload-label">
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              {form.logo_url ? "Logoyu Değiştir" : "Logo Yükle"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="sr-only"
                data-testid="ref-logo-input"
                onChange={(e) => uploadLogo(e.target.files?.[0])}
              />
            </label>
          </div>
          {isNew && <p className="mt-1.5 text-[11px] text-mute">Logo yüklemek için önce kaydedin.</p>}
        </div>
      )}
      {error && <p className="text-sm font-semibold text-red-600 sm:col-span-2" role="alert">{error}</p>}
      <div className="flex gap-2 sm:col-span-2">
        <button
          type="button"
          onClick={save}
          disabled={saving || form.name.trim().length < 2}
          data-testid="ref-save-button"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Kaydet
        </button>
        <button type="button" onClick={onCancel} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-ink" data-testid="ref-cancel-button">
          Vazgeç
        </button>
      </div>
    </div>
  );
};

export const ReferencesManager = ({ api }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    const { data } = await api.get("/admin/references");
    setItems(data.items);
  }, [api]);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  const onSaved = (saved) => {
    setItems((list) => {
      const exists = list.some((r) => r.id === saved.id);
      const next = exists ? list.map((r) => (r.id === saved.id ? saved : r)) : [...list, saved];
      return next.sort((a, b) => a.order - b.order);
    });
    setCreating(false);
  };

  // --- Sürükle & bırak sıralama ---
  const dragId = useRef(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const onDropRow = async (targetId) => {
    const from = dragId.current;
    dragId.current = null;
    if (!from || from === targetId) return;
    const next = [...items];
    const fromIdx = next.findIndex((r) => r.id === from);
    const toIdx = next.findIndex((r) => r.id === targetId);
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    const reOrdered = next.map((r, i) => ({ ...r, order: i + 1 }));
    setItems(reOrdered);
    setSavingOrder(true);
    try {
      await Promise.all(
        reOrdered
          .filter((r, i) => items[i]?.id !== r.id || items[i]?.order !== r.order)
          .map((r) => {
            const { id, logo_url, ...payload } = r;
            return api.patch(`/admin/references/${id}`, payload);
          })
      );
      toast.success("Sıralama kaydedildi");
    } catch {
      toast.error("Sıralama kaydedilemedi");
      load();
    } finally {
      setSavingOrder(false);
    }
  };

  return (
    <div data-testid="references-manager">
      <div className="flex items-center justify-between">
        <p className="text-sm text-mute">
          <span className="font-bold text-ink">{items.length}</span> referans kayıtlı
        </p>
        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          data-testid="ref-new-button"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white"
        >
          <Plus className="h-4 w-4" /> Yeni Referans
        </button>
      </div>

      <AnimatePresence>
        {creating && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-4 rounded-3xl border border-line bg-white p-5">
              <p className="text-sm font-bold text-ink">Yeni Referans</p>
              <ReferenceForm api={api} initial={EMPTY_FORM} onSaved={onSaved} onCancel={() => setCreating(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 overflow-hidden rounded-3xl border border-line bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-mute">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((r) => {
              const open = openId === r.id;
              return (
                <li
                  key={r.id}
                  draggable
                  onDragStart={() => (dragId.current = r.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDropRow(r.id)}
                >
                  <div className="flex w-full items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-mist">
                    <span className="cursor-grab text-mute/60 transition-colors hover:text-ink active:cursor-grabbing" data-testid={`ref-drag-${r.id}`} title="Sürükleyerek sırala">
                      <GripVertical className="h-4 w-4" />
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : r.id)}
                      data-testid={`ref-row-${r.id}`}
                      aria-expanded={open}
                      className="flex flex-1 items-center gap-4 text-left"
                    >
                    {r.logo_url ? (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}${r.logo_url}`}
                        alt=""
                        className="h-9 w-14 shrink-0 rounded-lg border border-line bg-white object-contain p-1"
                      />
                    ) : (
                      <span className="flex h-9 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-line text-[9px] font-bold uppercase text-mute">
                        Logo yok
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-ink">{r.name}</p>
                      <p className="text-xs text-mute">
                        {(r.solutions || []).map((s) => SOLUTION_OPTIONS.find((o) => o.id === s)?.name).filter(Boolean).join(" · ") || "—"}
                        {" · Sıra "}{r.order}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold ${r.active ? "bg-brand text-ink" : "bg-mist text-mute"}`}
                      data-testid={`ref-active-pill-${r.id}`}
                    >
                      {r.active ? "Aktif" : "Pasif"}
                    </span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-mute transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6">
                          <ReferenceForm api={api} initial={r} onSaved={onSaved} onCancel={() => setOpenId(null)} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
