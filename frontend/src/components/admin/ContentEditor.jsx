import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Loader2, Plus, Save, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { api } from "./adminApi";
import { TextField, TextArea, Toggle, ImageField } from "./fields";
import { ConfirmModal } from "./MediaLibrary";

// dot-path get/set
const getPath = (obj, path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
const setPath = (obj, path, value) => {
  const keys = path.split(".");
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = clone;
  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      cur[k] = value;
    } else {
      cur[k] = Array.isArray(cur[k]) ? [...cur[k]] : { ...(cur[k] ?? {}) };
      cur = cur[k];
    }
  });
  return clone;
};

const Field = ({ field, value, onChange, testIdPrefix }) => {
  const tid = `${testIdPrefix}-${field.path.replace(/\./g, "-")}`;
  if (field.type === "textarea") return <TextArea label={field.label} hint={field.hint} max={field.max} value={value} onChange={onChange} testId={tid} />;
  if (field.type === "toggle") return <Toggle label={field.label} value={!!value} onChange={onChange} testId={tid} />;
  if (field.type === "image") return <ImageField label={field.label} hint={field.hint} value={value} onChange={onChange} testId={tid} />;
  return <TextField label={field.label} hint={field.hint} placeholder={field.placeholder} value={value} onChange={onChange} testId={tid} />;
};

const ListGroup = ({ group, items, onChangeItems, testIdPrefix }) => {
  const [openIdx, setOpenIdx] = useState(0);
  const [deleteIdx, setDeleteIdx] = useState(null);

  // Düz metin listeleri (ör. platform çipleri): ["Trendyol", ...]
  if (group.simpleTextList) {
    return (
      <div className="space-y-2.5">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2" data-testid={`${testIdPrefix}-item-${i}`}>
            <input
              value={it}
              onChange={(e) => onChangeItems(items.map((x, xi) => (xi === i ? e.target.value : x)))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink focus:border-ink focus:outline-none"
            />
            {group.allowDelete && (
              <button type="button" onClick={() => onChangeItems(items.filter((_, xi) => xi !== i))} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-mute hover:border-red-300 hover:text-red-600" aria-label="Sil" data-testid={`${testIdPrefix}-del-${i}`}>
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        {group.allowAdd && (
          <button
            type="button"
            onClick={() => onChangeItems([...items, group.newItem()])}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-white py-3 text-sm font-bold text-mute transition-colors hover:border-ink hover:text-ink"
            data-testid={`${testIdPrefix}-add`}
          >
            <Plus className="h-4 w-4" /> {group.addLabel || "Yeni Öğe Ekle"}
          </button>
        )}
      </div>
    );
  }

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const arr = [...items];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChangeItems(arr);
    setOpenIdx(j);
  };

  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-line bg-mist/60" data-testid={`${testIdPrefix}-item-${i}`}>
          <div className="flex items-center gap-2 px-4 py-3">
            <button type="button" onClick={() => setOpenIdx(openIdx === i ? -1 : i)} className="flex flex-1 items-center gap-2 text-left">
              <ChevronDown className={`h-4 w-4 text-mute transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
              <span className="text-sm font-bold text-ink">{group.itemTitle ? group.itemTitle(it, i) : `Öğe ${i + 1}`}</span>
            </button>
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-white text-mute hover:text-ink disabled:opacity-30" aria-label="Yukarı taşı" data-testid={`${testIdPrefix}-up-${i}`}>
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-white text-mute hover:text-ink disabled:opacity-30" aria-label="Aşağı taşı" data-testid={`${testIdPrefix}-down-${i}`}>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {group.allowDelete && (
              <button type="button" onClick={() => setDeleteIdx(i)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-white text-mute hover:border-red-300 hover:text-red-600" aria-label="Sil" data-testid={`${testIdPrefix}-del-${i}`}>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {openIdx === i && (
            <div className="grid gap-4 border-t border-line px-4 py-4 sm:grid-cols-2">
              {group.itemFields.map((f) => (
                <div key={f.path} className={f.type === "textarea" || f.type === "image" ? "sm:col-span-2" : ""}>
                  <Field
                    field={f}
                    value={it[f.path]}
                    onChange={(v) => onChangeItems(items.map((x, xi) => (xi === i ? { ...x, [f.path]: v } : x)))}
                    testIdPrefix={`${testIdPrefix}-item-${i}`}
                  />
                </div>
              ))}
              {group.featuresPath && (
                <div className="sm:col-span-2">
                  <TextArea
                    label={group.featuresLabel || "Özellikler (her satıra bir tane)"}
                    value={(it[group.featuresPath] || []).join("\n")}
                    onChange={(v) => onChangeItems(items.map((x, xi) => (xi === i ? { ...x, [group.featuresPath]: v.split("\n") } : x)))}
                    rows={4}
                    testId={`${testIdPrefix}-item-${i}-features`}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {group.allowAdd && (
        <button
          type="button"
          onClick={() => { onChangeItems([...items, group.newItem()]); setOpenIdx(items.length); }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-white py-3.5 text-sm font-bold text-mute transition-colors hover:border-ink hover:text-ink"
          data-testid={`${testIdPrefix}-add`}
        >
          <Plus className="h-4 w-4" /> {group.addLabel || "Yeni Öğe Ekle"}
        </button>
      )}
      {deleteIdx !== null && (
        <ConfirmModal
          title="Öğeyi sil"
          desc="Bu öğe listeden kaldırılacak. Değişiklik kaydedilene kadar public siteye yansımaz."
          onCancel={() => setDeleteIdx(null)}
          onConfirm={() => { onChangeItems(items.filter((_, xi) => xi !== deleteIdx)); setDeleteIdx(null); setOpenIdx(-1); }}
        />
      )}
    </div>
  );
};

export const ContentEditor = ({ schema }) => {
  const [doc, setDoc] = useState(null); // {data, draft, has_draft, ...}
  const [work, setWork] = useState(null); // düzenlenen kopya
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    api.get("/admin/content").then((r) => {
      const found = r.data.items.find((d) => d.key === schema.key);
      setDoc(found);
      setWork(found.draft ?? found.data);
    });
  }, [schema.key]);

  useEffect(() => {
    const warn = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = (path, value) => {
    setWork((w) => setPath(w, path, value));
    setDirty(true);
  };

  const save = async (publish) => {
    publish ? setPublishing(true) : setSaving(true);
    try {
      const { data } = await api.put(`/admin/content/${schema.key}`, { data: work, publish });
      setDoc(data);
      setWork(data.draft ?? data.data);
      setDirty(false);
      toast.success(publish ? "Yayınlandı — public site güncellendi" : "Taslak kaydedildi (public site değişmedi)");
    } catch (e) {
      toast.error(e.response?.data?.detail || "Kaydedilemedi");
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  const hasDraftBadge = useMemo(() => doc?.has_draft, [doc]);

  if (!doc || !work) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-mute" />
      </div>
    );
  }

  return (
    <div data-testid={`editor-${schema.key}`}>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold tracking-tight text-ink">{schema.title}</h2>
        {hasDraftBadge && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-800" data-testid={`editor-${schema.key}-draft-badge`}>
            Yayınlanmamış taslak var
          </span>
        )}
        {dirty && <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-bold text-mute">Kaydedilmemiş değişiklikler</span>}
      </div>

      <div className="mt-6 space-y-5">
        {schema.groups.map((g) => (
          <section key={g.id} className="rounded-3xl border border-line bg-white p-6 md:p-7" data-testid={`editor-${schema.key}-${g.id}`}>
            <h3 className="text-[15px] font-bold text-ink">{g.title}</h3>
            {g.desc && <p className="mt-1 text-[13px] text-mute">{g.desc}</p>}
            <div className="mt-5">
              {g.type === "list" ? (
                <ListGroup
                  group={g}
                  items={getPath(work, g.path) || []}
                  onChangeItems={(arr) => update(g.path, arr)}
                  testIdPrefix={`editor-${schema.key}-${g.id}`}
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {g.fields.map((f) => (
                    <div key={f.path} className={f.type === "textarea" || f.type === "image" || f.wide ? "sm:col-span-2" : ""}>
                      <Field field={f} value={getPath(work, f.path)} onChange={(v) => update(f.path, v)} testIdPrefix={`editor-${schema.key}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Kaydetme çubuğu */}
      <div className="sticky bottom-4 z-20 mt-8 flex flex-wrap items-center gap-2.5 rounded-2xl border border-line bg-white/95 p-3.5 shadow-[0_12px_40px_rgba(16,17,16,0.12)] backdrop-blur">
        {schema.preview && (
          <a
            href={schema.preview}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-ink"
            data-testid={`editor-${schema.key}-preview`}
          >
            <ExternalLink className="h-4 w-4" /> Önizle
          </a>
        )}
        <div className="ml-auto flex gap-2.5">
          <button
            type="button"
            onClick={() => save(false)}
            disabled={saving || publishing || !dirty}
            className="flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-ink disabled:opacity-40"
            data-testid={`editor-${schema.key}-save`}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Kaydet
          </button>
          <button
            type="button"
            onClick={() => save(true)}
            disabled={saving || publishing || (!dirty && !doc.has_draft)}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-40"
            data-testid={`editor-${schema.key}-publish`}
          >
            {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />} Kaydet ve Yayınla
          </button>
        </div>
      </div>
    </div>
  );
};
