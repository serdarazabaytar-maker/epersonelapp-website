import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, ImagePlus, Loader2, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { api } from "./adminApi";

export const MEDIA_CATEGORIES = ["Logolar", "Favicon", "Ana Sayfa", "EP", "EPapp", "EPfood", "EPgo", "Referanslar", "OG / Sosyal Paylaşım"];

const fmtSize = (b) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round((b || 0) / 1024))} KB`);

// Silme onayı — küçük modal
export const ConfirmModal = ({ title, desc, onCancel, onConfirm, busy }) => (
  <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/40 p-5" data-testid="confirm-modal">
    <div className="w-full max-w-sm rounded-3xl border border-line bg-white p-7 shadow-2xl">
      <h3 className="text-lg font-bold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mute">{desc}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-full border border-line px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-ink">
          Vazgeç
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={busy}
          className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
          data-testid="confirm-delete-btn"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Sil
        </button>
      </div>
    </div>
  </div>
);

const MediaCard = ({ item, onRename, onDelete, onCopy, copied }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name || "");
  return (
    <div className="group overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_12px_36px_rgba(16,17,16,0.08)]" data-testid={`media-card-${item.id}`}>
      <div className="flex h-36 items-center justify-center bg-mist p-3">
        <img src={item.url} alt={item.name} className="max-h-full max-w-full object-contain" loading="lazy" />
      </div>
      <div className="p-3.5">
        {editing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onRename(item.id, name);
              setEditing(false);
            }}
            className="flex gap-1.5"
          >
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold focus:border-ink focus:outline-none" />
            <button type="submit" className="rounded-lg bg-ink px-2.5 text-white" aria-label="Kaydet">
              <Check className="h-3.5 w-3.5" />
            </button>
          </form>
        ) : (
          <p className="truncate text-[13px] font-bold text-ink" title={item.name}>{item.name}</p>
        )}
        <p className="mt-0.5 text-[11px] font-semibold text-mute">{item.category} · {fmtSize(item.size)}</p>
        <div className="mt-2.5 flex items-center gap-1.5">
          <button type="button" onClick={() => onCopy(item)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-mute transition-colors hover:text-ink" aria-label="URL kopyala" data-testid={`media-copy-${item.id}`}>
            {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <button type="button" onClick={() => setEditing(true)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-mute transition-colors hover:text-ink" aria-label="İsmi değiştir">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => onDelete(item)} className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg border border-line text-mute transition-colors hover:border-red-300 hover:text-red-600" aria-label="Sil" data-testid={`media-delete-${item.id}`}>
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Görsel seçici modal — ImageField tarafından kullanılır
export const MediaPicker = ({ onSelect, onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("/admin/media").then((r) => setItems(r.data.items)).finally(() => setLoading(false));
  }, []);
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/40 p-5" data-testid="media-picker">
      <div className="flex max-h-[80vh] w-full max-w-3xl flex-col rounded-3xl border border-line bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight text-ink">Medya Kütüphanesi</h3>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mute hover:text-ink" aria-label="Kapat">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 grid flex-1 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
          {loading ? (
            <Loader2 className="col-span-full mx-auto h-6 w-6 animate-spin text-mute" />
          ) : items.length === 0 ? (
            <p className="col-span-full py-10 text-center text-sm font-semibold text-mute">Henüz görsel yok. Önce Medya bölümünden yükleyin.</p>
          ) : (
            items.map((m) => (
              <button key={m.id} type="button" onClick={() => onSelect(m.url)} className="group overflow-hidden rounded-xl border border-line text-left transition-colors hover:border-ink" data-testid={`media-pick-${m.id}`}>
                <div className="flex h-24 items-center justify-center bg-mist p-2">
                  <img src={m.url} alt={m.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <p className="truncate px-2.5 py-2 text-[11px] font-bold text-ink">{m.name}</p>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const MediaLibrary = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    const { data } = await api.get("/admin/media", { params: category ? { category } : {} });
    setItems(data.items);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [load]);

  const upload = async (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    setUploading(true);
    try {
      for (const f of list) {
        const fd = new FormData();
        fd.append("file", f);
        fd.append("name", f.name);
        fd.append("category", category || "Ana Sayfa");
        await api.post("/admin/media", fd);
      }
      toast.success(`${list.length} görsel yüklendi`);
      await load();
    } catch (e) {
      toast.error(e.response?.data?.detail || "Yükleme başarısız");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const rename = async (id, name) => {
    await api.patch(`/admin/media/${id}`, { name });
    setItems((arr) => arr.map((m) => (m.id === id ? { ...m, name } : m)));
    toast.success("İsim güncellendi");
  };

  const remove = async () => {
    setDeleting(true);
    try {
      await api.delete(`/admin/media/${toDelete.id}`);
      setItems((arr) => arr.filter((m) => m.id !== toDelete.id));
      toast.success("Görsel silindi");
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const copyUrl = (item) => {
    navigator.clipboard.writeText(`${window.location.origin}${item.url}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
    toast.success("URL kopyalandı");
  };

  return (
    <div data-testid="media-library">
      <div className="flex flex-wrap items-center gap-2">
        {["", ...MEDIA_CATEGORIES].map((c) => (
          <button
            key={c || "all"}
            type="button"
            onClick={() => setCategory(c)}
            data-testid={`media-filter-${c || "all"}`}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${category === c ? "bg-ink text-white" : "border border-line bg-white text-mute hover:text-ink"}`}
          >
            {c || "Tümü"}
          </button>
        ))}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="ml-auto flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
          data-testid="media-upload-btn"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />} Görsel Yükle
        </button>
        <input ref={fileRef} type="file" multiple accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={(e) => upload(e.target.files)} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <Loader2 className="col-span-full mx-auto h-6 w-6 animate-spin text-mute" />
        ) : items.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-line bg-white py-16 text-center">
            <ImagePlus className="mx-auto h-8 w-8 text-mute" />
            <p className="mt-3 text-sm font-semibold text-mute">Bu kategoride görsel yok.</p>
          </div>
        ) : (
          items.map((m) => <MediaCard key={m.id} item={m} onRename={rename} onDelete={setToDelete} onCopy={copyUrl} copied={copiedId === m.id} />)
        )}
      </div>

      {toDelete && (
        <ConfirmModal
          title="Görseli sil"
          desc={`"${toDelete.name}" kalıcı olarak silinecek. Bu görseli kullanan içerikler etkilenebilir.`}
          onCancel={() => setToDelete(null)}
          onConfirm={remove}
          busy={deleting}
        />
      )}
    </div>
  );
};
