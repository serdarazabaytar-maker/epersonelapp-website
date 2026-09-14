import { useEffect } from "react";
import { useSeoOverride } from "@/content/ContentContext";

const DEFAULT_IMAGE = "/og-image.png";

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) {
    if (el && el.dataset.seoManaged) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.dataset.seoManaged = "true";
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export default function Seo({ title, siteName, description, image, jsonLd, canonical, noindex, page }) {
  // CMS override'ları (admin → SEO / Ayarlar); tanımlı değilse props kullanılır
  const over = useSeoOverride(page);
  const rTitle = over.title || title;
  const rDesc = over.description || description;
  const rOgTitle = over.ogTitle || rTitle;
  const rOgDesc = over.ogDescription || rDesc;
  const rImage = over.image || image || over.defaultOgImage || DEFAULT_IMAGE;
  const rSiteName = over.siteName || siteName;
  const rCanonical = over.canonical || canonical;
  const rNoindex = over.noindex || noindex;

  useEffect(() => {
    const url = window.location.origin + window.location.pathname;

    let canonicalEl = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", rCanonical || url);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    if (rSiteName) setMeta("property", "og:site_name", rSiteName);
    if (rNoindex) setMeta("name", "robots", "noindex, nofollow");
    if (rTitle) {
      document.title = rTitle;
      setMeta("name", "twitter:title", rTitle);
    }
    if (rOgTitle) setMeta("property", "og:title", rOgTitle);
    if (rDesc) {
      setMeta("name", "description", rDesc);
      setMeta("name", "twitter:description", rDesc);
    }
    if (rOgDesc) setMeta("property", "og:description", rOgDesc);
    const abs = rImage.startsWith("http") ? rImage : window.location.origin + rImage;
    setMeta("property", "og:image", abs);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("name", "twitter:image", abs);
    setMeta("name", "twitter:card", "summary_large_image");

    let script;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoManaged = "true";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
      if (rNoindex) setMeta("name", "robots", null);
    };
  }, [rTitle, rSiteName, rDesc, rOgTitle, rOgDesc, rImage, rCanonical, rNoindex, jsonLd]);

  return null;
}
