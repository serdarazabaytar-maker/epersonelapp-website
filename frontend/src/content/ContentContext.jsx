import { createContext, useContext, useEffect, useState } from "react";

// Public sitenin CMS veri kaynağı: GET /api/content (yalnızca yayınlanmış içerikler).
// API'ye ulaşılamazsa sayfalar hard-coded varsayılanlarıyla çalışmaya devam eder.
const Ctx = createContext({});

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/content`)
      .then((r) => (r.ok ? r.json() : {}))
      .then(setContent)
      .catch(() => {});
  }, []);

  // Marka asseti değişirse favicon'u merkezi olarak güncelle
  useEffect(() => {
    const fav = content?.brand?.favicon;
    if (fav && fav !== "/favicon.ico") {
      document.querySelectorAll("link[rel~='icon']").forEach((l) => {
        l.href = fav;
      });
    }
  }, [content]);

  return <Ctx.Provider value={content}>{children}</Ctx.Provider>;
};

export const useCms = (key) => useContext(Ctx)[key];

// CMS değerini fallback üzerine derin merge et.
// "" (boş string) ve boş array = "dokunulmamış" sayılır, fallback korunur.
export const cmsMerge = (fallback, cms) => {
  if (cms === undefined || cms === null || cms === "") return fallback;
  if (Array.isArray(cms)) return cms.length ? cms : fallback;
  if (typeof cms === "object") {
    const base = fallback && typeof fallback === "object" && !Array.isArray(fallback) ? fallback : {};
    const out = { ...base };
    Object.keys(cms).forEach((k) => {
      out[k] = cmsMerge(base[k], cms[k]);
    });
    return out;
  }
  return cms;
};

export const useCmsMerged = (key, fallback) => cmsMerge(fallback, useCms(key));

// Sayfa SEO override'ı: admin panelde tanımlıysa title/description/OG/canonical/noindex döner
export const useSeoOverride = (page) => {
  const seo = useCms("seo");
  const p = seo?.pages?.[page] || {};
  const g = seo?.global || {};
  return {
    title: p.title || undefined,
    description: p.description || undefined,
    ogTitle: p.ogTitle || undefined,
    ogDescription: p.ogDescription || undefined,
    image: p.ogImage || undefined,
    canonical: p.canonical || undefined,
    noindex: !!p.noindex,
    siteName: g.siteName || undefined,
    defaultOgImage: g.defaultOgImage || undefined,
  };
};

// CTA linki "#" ile başlıyorsa sayfa içi anchor (href), değilse route linki (to)
export const ctaLinkProps = (link) => ((link || "").startsWith("#") ? { href: link } : { to: link || "/" });
