import { useEffect } from "react";

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

export default function Seo({ title, siteName, description, image, jsonLd }) {
  useEffect(() => {
    const url = window.location.origin + window.location.pathname;

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    if (siteName) setMeta("property", "og:site_name", siteName);
    if (title) {
      document.title = title;
      setMeta("property", "og:title", title);
      setMeta("name", "twitter:title", title);
    }
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    if (image) {
      const abs = window.location.origin + image;
      setMeta("property", "og:image", abs);
      setMeta("name", "twitter:image", abs);
      setMeta("name", "twitter:card", "summary_large_image");
    }

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
    };
  }, [title, siteName, description, image, jsonLd]);

  return null;
}
