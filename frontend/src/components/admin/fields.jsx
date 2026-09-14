import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Link2, X } from "lucide-react";
import { api } from "./adminApi";
import { MediaPicker } from "./MediaLibrary";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors focus:border-ink focus:outline-none";

export const FieldLabel = ({ children, hint }) => (
  <label className="mb-1.5 block text-[13px] font-bold text-ink">
    {children}
    {hint && <span className="ml-2 text-[11px] font-semibold text-mute">{hint}</span>}
  </label>
);

export const TextField = ({ label, value, onChange, hint, testId, placeholder }) => (
  <div>
    <FieldLabel hint={hint}>{label}</FieldLabel>
    <input
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputCls}
      data-testid={testId}
    />
  </div>
);

export const TextArea = ({ label, value, onChange, hint, max, testId, rows = 3 }) => (
  <div>
    <FieldLabel hint={hint}>{label}</FieldLabel>
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`${inputCls} resize-y`}
      data-testid={testId}
    />
    {max ? (
      <p className={`mt-1 text-right text-[11px] font-semibold ${(value || "").length > max ? "text-red-600" : "text-mute"}`}>
        {(value || "").length}/{max}
      </p>
    ) : null}
  </div>
);

export const Toggle = ({ label, value, onChange, testId }) => (
  <button
    type="button"
    onClick={() => onChange(!value)}
    data-testid={testId}
    className="flex items-center gap-2.5"
    aria-pressed={!!value}
  >
    <span className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-brand" : "bg-line"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${value ? "left-[22px]" : "left-0.5"}`} />
    </span>
    <span className="text-[13px] font-bold text-ink">{label}</span>
  </button>
);

// Görsel alanı: önizleme + medya kütüphanesinden seç + doğrudan yükle + kaldır
export const ImageField = ({ label, value, onChange, hint, testId }) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("name", file.name);
      fd.append("category", "Ana Sayfa");
      const { data } = await api.post("/admin/media", fd);
      onChange(data.url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <FieldLabel hint={hint}>{label}</FieldLabel>
      <div className="flex items-center gap-3" data-testid={testId}>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-mist">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <ImagePlus className="h-5 w-5 text-mute" />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink transition-colors hover:border-ink"
            data-testid={`${testId}-pick`}
          >
            Kütüphaneden Seç
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink transition-colors hover:border-ink disabled:opacity-50"
            data-testid={`${testId}-upload`}
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Yükle"}
          </button>
          {value && (
            <>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}${value}`)}
                className="flex items-center gap-1 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-bold text-mute transition-colors hover:text-ink"
              >
                <Link2 className="h-3 w-3" /> URL
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-mute transition-colors hover:border-red-300 hover:text-red-600"
                aria-label="Görseli kaldır"
                data-testid={`${testId}-clear`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
      </div>
      {pickerOpen && <MediaPicker onSelect={(url) => { onChange(url); setPickerOpen(false); }} onClose={() => setPickerOpen(false)} />}
    </div>
  );
};
