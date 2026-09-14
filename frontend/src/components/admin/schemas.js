// CMS editör şemaları — her şema bir site_content anahtarına bağlanır.
// Field tipleri: text | textarea | toggle | image

const HERO_FIELDS = (withImage = true) => [
  { path: "hero.eyebrow", type: "text", label: "Eyebrow / Küçük Üst Başlık" },
  { path: "hero.title1", type: "text", label: "Ana Başlık — 1. Satır" },
  { path: "hero.title2", type: "text", label: "Ana Başlık — 2. Satır (vurgu)" },
  { path: "hero.desc", type: "textarea", label: "Alt Açıklama", max: 220, wide: true },
  { path: "hero.cta1Text", type: "text", label: "Birincil CTA Metni" },
  { path: "hero.cta1Link", type: "text", label: "Birincil CTA Linki", placeholder: "/iletisim veya #teklif" },
  { path: "hero.cta2Text", type: "text", label: "İkincil CTA Metni" },
  { path: "hero.cta2Link", type: "text", label: "İkincil CTA Linki" },
  ...(withImage ? [{ path: "hero.image", type: "image", label: "Hero Görseli (opsiyonel)", hint: "boş bırakılırsa mevcut animasyon kalır" }] : []),
];

const AREA_ITEM_FIELDS = [
  { path: "title", type: "text", label: "Bölüm Başlığı" },
  { path: "desc", type: "textarea", label: "Açıklama", max: 260 },
  { path: "image", type: "image", label: "Görsel (opsiyonel)", hint: "boş = mevcut görsel kalır" },
  { path: "cta", type: "text", label: "CTA Metni (opsiyonel)" },
  { path: "visible", type: "toggle", label: "Görünür" },
];

export const HOME_SCHEMA = {
  key: "home",
  title: "Ana Sayfa İçeriği",
  preview: "/",
  groups: [
    {
      id: "hero",
      title: "Hero",
      fields: [
        { path: "hero.eyebrow", type: "text", label: "Eyebrow / Küçük Üst Başlık" },
        { path: "hero.line1", type: "text", label: "Ana Başlık — 1. Satır" },
        { path: "hero.line2", type: "text", label: "Ana Başlık — 2. Satır" },
        { path: "hero.line3", type: "text", label: "Ana Başlık — 3. Satır (vurgu)" },
        { path: "hero.desc", type: "textarea", label: "Alt Açıklama", max: 220, wide: true },
        { path: "hero.cta1Text", type: "text", label: "Birincil CTA Metni" },
        { path: "hero.cta1Link", type: "text", label: "Birincil CTA Linki" },
        { path: "hero.cta2Text", type: "text", label: "İkincil CTA Metni" },
        { path: "hero.cta2Link", type: "text", label: "İkincil CTA Linki" },
      ],
    },
    {
      id: "solutions",
      title: "Çözüm Alanı",
      desc: "Sıra sabittir: EP → EPapp → EPfood → EPgo. Logo boş bırakılırsa marka logosu kullanılır.",
      type: "list",
      path: "solutions",
      itemTitle: (it) => it.name || "Çözüm",
      itemFields: [
        { path: "name", type: "text", label: "Ad" },
        { path: "desc", type: "textarea", label: "Kısa Açıklama", max: 160 },
        { path: "cta", type: "text", label: "CTA Metni" },
        { path: "link", type: "text", label: "CTA Linki" },
        { path: "logo", type: "image", label: "Logo (opsiyonel)" },
        { path: "visible", type: "toggle", label: "Görünür" },
      ],
    },
    {
      id: "metrics",
      title: "Metrikler",
      type: "list",
      path: "metrics",
      itemTitle: (it) => `${it.value} — ${it.label}`,
      itemFields: [
        { path: "value", type: "text", label: "Değer", placeholder: "100K+" },
        { path: "label", type: "text", label: "Başlık" },
        { path: "active", type: "toggle", label: "Aktif" },
      ],
    },
    {
      id: "finalCta",
      title: "Final CTA",
      fields: [
        { path: "finalCta.eyebrow", type: "text", label: "Eyebrow" },
        { path: "finalCta.title", type: "text", label: "Başlık", wide: true },
        { path: "finalCta.desc", type: "textarea", label: "Açıklama", max: 220, wide: true },
        { path: "finalCta.cta1Text", type: "text", label: "Buton 1 Metni" },
        { path: "finalCta.cta1Link", type: "text", label: "Buton 1 Linki" },
        { path: "finalCta.cta2Text", type: "text", label: "Buton 2 Metni" },
        { path: "finalCta.cta2Link", type: "text", label: "Buton 2 Linki" },
      ],
    },
  ],
};

export const STEPS_SCHEMA = {
  key: "steps",
  title: "4 Adım Bölümü",
  preview: "/",
  groups: [
    {
      id: "general",
      title: "Genel",
      fields: [
        { path: "eyebrow", type: "text", label: "Eyebrow" },
        { path: "title", type: "text", label: "Bölüm Başlığı", wide: true },
        { path: "desc", type: "textarea", label: "Açıklama", max: 220, wide: true },
        { path: "flow", type: "text", label: "Akış Metni", wide: true, placeholder: "Entegre et → Sipariş al → Hazırla → Teslim et" },
      ],
    },
    {
      id: "items",
      title: "Adımlar",
      desc: "Oklarla sıralayın; akış her zaman 4 adım olarak tasarlanmıştır.",
      type: "list",
      path: "items",
      itemTitle: (it, i) => `${String(i + 1).padStart(2, "0")} · ${it.short || it.title}`,
      featuresPath: "features",
      featuresLabel: "Özellikler (her satıra bir tane)",
      itemFields: [
        { path: "short", type: "text", label: "Kısa Ad (sekme)", placeholder: "Entegre et" },
        { path: "title", type: "text", label: "Adım Başlığı" },
        { path: "desc", type: "textarea", label: "Açıklama", max: 200 },
        { path: "image", type: "image", label: "Görsel (opsiyonel)", hint: "boş = mevcut animasyon kalır" },
        { path: "visible", type: "toggle", label: "Görünür" },
      ],
    },
  ],
};

export const EP_SCHEMA = {
  key: "page_ep",
  title: "EP Sayfası",
  preview: "/ep",
  groups: [
    { id: "hero", title: "Hero", fields: HERO_FIELDS() },
    {
      id: "platforms",
      title: "Platform Çipleri",
      type: "list",
      path: "platforms",
      allowAdd: true,
      allowDelete: true,
      addLabel: "Platform Ekle",
      newItem: () => "",
      itemTitle: (it) => it || "Platform",
      itemFields: [],
      simpleTextList: true,
    },
    {
      id: "sectors",
      title: "Sektörler",
      type: "list",
      path: "sectors",
      itemTitle: (it) => it.name,
      itemFields: [
        { path: "name", type: "text", label: "Sektör Adı" },
        { path: "active", type: "toggle", label: "Aktif" },
      ],
    },
    {
      id: "packages",
      title: "Paketler",
      type: "list",
      path: "packages",
      itemTitle: (it) => `${it.name} — ₺${it.price}`,
      featuresPath: "features",
      featuresLabel: "Özellikler (her satıra bir tane)",
      itemFields: [
        { path: "name", type: "text", label: "Paket Adı" },
        { path: "price", type: "text", label: "Fiyat (₺)" },
        { path: "kdv", type: "text", label: "KDV Metni", placeholder: "+ KDV / ay" },
        { path: "badge", type: "text", label: "Rozet (opsiyonel)", placeholder: "En Çok Tercih Edilen" },
        { path: "recommended", type: "toggle", label: "Önerilen Paket (varsayılan seçili)" },
        { path: "active", type: "toggle", label: "Aktif" },
      ],
    },
  ],
};

export const EPAPP_SCHEMA = {
  key: "page_epapp",
  title: "EPapp Sayfası",
  preview: "/epapp",
  groups: [
    { id: "hero", title: "Hero", fields: HERO_FIELDS() },
    {
      id: "areas",
      title: "Bölümler",
      desc: "Pazaryeri Entegrasyonları, Markaya Özel Web & Mobil, Personel Uygulaması, Admin Panel ve Çoklu Şube bölümleri.",
      type: "list",
      path: "areas",
      itemTitle: (it) => it.title,
      itemFields: AREA_ITEM_FIELDS,
    },
  ],
};

export const EPFOOD_SCHEMA = {
  key: "page_epfood",
  title: "EPfood Sayfası",
  preview: "/epfood",
  groups: [
    { id: "hero", title: "Hero", fields: HERO_FIELDS() },
    {
      id: "areas",
      title: "Bölümler",
      desc: "Panel Kurulumu, Menü Çalışması, Opsiyon & Ekstralar, Ürün Görselleri ve Tek Ekran bölümleri.",
      type: "list",
      path: "areas",
      itemTitle: (it) => it.title,
      itemFields: AREA_ITEM_FIELDS,
    },
  ],
};

export const EPGO_SCHEMA = {
  key: "page_epgo",
  title: "EPgo Sayfası",
  preview: "/epgo",
  groups: [
    { id: "hero", title: "Hero", fields: HERO_FIELDS() },
    {
      id: "areas",
      title: "Bölümler",
      desc: "Hemen teslim, randevulu teslim, moto kurye ve frigolu panelvan bölümleri. Görsel boş bırakılırsa mevcut görsel korunur.",
      type: "list",
      path: "areas",
      itemTitle: (it) => it.title,
      itemFields: AREA_ITEM_FIELDS,
    },
  ],
};

export const ABOUT_SCHEMA = {
  key: "about",
  title: "Hakkımızda Sayfası",
  preview: "/hakkimizda",
  groups: [
    {
      id: "main",
      title: "Ana İçerik",
      fields: [
        { path: "line1", type: "text", label: "Ana Başlık — 1. Satır" },
        { path: "line2", type: "text", label: "Ana Başlık — 2. Satır (vurgu)" },
        { path: "p1", type: "textarea", label: "Açıklama — 1. Paragraf", max: 400, wide: true },
        { path: "p2", type: "textarea", label: "Açıklama — 2. Paragraf", max: 400, wide: true },
        { path: "p3", type: "textarea", label: "Ek Paragraf", max: 400, wide: true },
      ],
    },
    {
      id: "model",
      title: "Çalışma Modeli Maddeleri",
      type: "list",
      path: "model",
      itemTitle: (it) => `${it.n} · ${it.title}`,
      itemFields: [
        { path: "title", type: "text", label: "Madde Başlığı" },
        { path: "desc", type: "textarea", label: "Açıklama", max: 200 },
      ],
    },
    {
      id: "cta",
      title: "CTA Alanı",
      fields: [
        { path: "ctaTitle", type: "text", label: "CTA Başlığı", wide: true },
        { path: "ctaDesc", type: "textarea", label: "CTA Açıklaması", max: 200, wide: true },
        { path: "ctaText", type: "text", label: "Buton Metni" },
        { path: "ctaLink", type: "text", label: "Buton Linki" },
      ],
    },
  ],
};

export const CONTACT_SCHEMA = {
  key: "contact",
  title: "İletişim Sayfası",
  preview: "/iletisim",
  groups: [
    {
      id: "main",
      title: "Sayfa İçeriği",
      fields: [
        { path: "title", type: "text", label: "Ana Başlık", wide: true },
        { path: "desc", type: "textarea", label: "Açıklama", max: 160, wide: true },
        { path: "formTitle", type: "text", label: "Form Başlığı" },
        { path: "formDesc", type: "text", label: "Form Açıklaması" },
      ],
    },
    {
      id: "channels",
      title: "İletişim Kanalları",
      fields: [
        { path: "phone", type: "text", label: "Telefon (görünen)", placeholder: "+90 (212) 000 00 00" },
        { path: "phoneTel", type: "text", label: "Telefon (tel: linki)", placeholder: "+902120000000" },
        { path: "email", type: "text", label: "E-posta" },
        { path: "instagram", type: "text", label: "Instagram Linki" },
        { path: "linkedin", type: "text", label: "LinkedIn Linki" },
      ],
    },
  ],
};

const SEO_PAGE_FIELDS = (p) => [
  { path: `pages.${p}.title`, type: "text", label: "SEO Title", max: 70, wide: true },
  { path: `pages.${p}.description`, type: "textarea", label: "Meta Description", max: 160, wide: true },
  { path: `pages.${p}.ogTitle`, type: "text", label: "Open Graph Title (opsiyonel)", wide: true },
  { path: `pages.${p}.ogDescription`, type: "textarea", label: "Open Graph Description (opsiyonel)", max: 200, wide: true },
  { path: `pages.${p}.ogImage`, type: "image", label: "Open Graph Görseli (opsiyonel)" },
  { path: `pages.${p}.canonical`, type: "text", label: "Canonical URL (opsiyonel)", placeholder: "boş = sayfa adresi kullanılır" },
  { path: `pages.${p}.noindex`, type: "toggle", label: "noindex (arama motorlarından gizle)" },
];

export const SEO_SCHEMA = {
  key: "seo",
  title: "SEO / Ayarlar",
  preview: "/",
  groups: [
    {
      id: "global",
      title: "Genel Ayarlar",
      fields: [
        { path: "global.siteName", type: "text", label: "Site Adı" },
        { path: "global.domain", type: "text", label: "Ana Domain", placeholder: "https://www.epersonelapp.com" },
        { path: "global.defaultOgImage", type: "image", label: "Varsayılan OG Görseli" },
        { path: "global.phone", type: "text", label: "Telefon" },
        { path: "global.email", type: "text", label: "E-posta" },
        { path: "global.instagram", type: "text", label: "Instagram" },
        { path: "global.linkedin", type: "text", label: "LinkedIn" },
      ],
    },
    ...[
      ["home", "Ana Sayfa"], ["ep", "EP"], ["epapp", "EPapp"], ["epfood", "EPfood"],
      ["epgo", "EPgo"], ["referanslar", "Referanslar"], ["hakkimizda", "Hakkımızda"], ["iletisim", "İletişim"],
    ].map(([p, label]) => ({ id: `seo-${p}`, title: `Sayfa SEO — ${label}`, fields: SEO_PAGE_FIELDS(p) })),
  ],
};

export const BRAND_SCHEMA = {
  key: "brand",
  title: "Marka Assetleri",
  preview: "/",
  groups: [
    {
      id: "logos",
      title: "Logolar & İkonlar",
      desc: "Buradan değiştirilen assetler public sitede merkezi olarak güncellenir.",
      fields: [
        { path: "epersonel", type: "image", label: "Epersonel Logo" },
        { path: "ep", type: "image", label: "EP Logo" },
        { path: "epapp", type: "image", label: "EPapp Logo" },
        { path: "epfood", type: "image", label: "EPfood Logo" },
        { path: "epgo", type: "image", label: "EPgo Logo" },
        { path: "favicon", type: "image", label: "Favicon" },
        { path: "ogImage", type: "image", label: "Open Graph Görseli" },
      ],
    },
  ],
};

export const FOOTER_SCHEMA = {
  key: "footer",
  title: "Footer",
  preview: "/",
  groups: [
    {
      id: "main",
      title: "Footer İçeriği",
      desc: "Çözüm linklerinin sırası sabittir: EP / EPAPP / EPFOOD / EPGO.",
      fields: [
        { path: "desc", type: "textarea", label: "Kısa Marka Açıklaması", max: 160, wide: true },
        { path: "copyright", type: "text", label: "Copyright Metni", wide: true },
      ],
    },
  ],
};
