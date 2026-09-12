// Site genelinde kullanılan içerik verileri.
// Bu dosya merkezi config görevi görür; yeni referans/metrik/iletişim bilgileri buradan güncellenir.

export const LOGOS = {
  epersonel: "/assets/logos/epersonel.png",
  ep: "/assets/logos/ep.png",
  epapp: "/assets/logos/epapp.png",
  epkurye: "/assets/logos/epkurye.png",
  epfood: "/assets/logos/epfood.png",
};

// Merkezi iletişim bilgileri — tüm componentler buradan beslenir, hard-code yok.
// Telefon / WhatsApp gerçek numara tanımlanana kadar null kalır (kullanıcıya yanlış bilgi gösterilmez).
export const CONTACT = {
  email: "info@epersonelapp.com",
  phone: null,
  whatsapp: null,
};

export const SOLUTIONS = [
  {
    id: "ep",
    name: "EP",
    path: "/ep",
    label: "KÜÇÜK İŞLETMELER",
    tagline: "Küçük işletmeler için pazaryeri operasyonu",
    title: "Pazaryerlerinde satışa başlayın.",
    desc: "Market, kasap, manav, şarküteri, petshop ve su bayileri için.",
    tags: ["Pazaryeri", "Ürün", "Stok", "Fiyat"],
    cta: "EP'yi Keşfet",
    logo: LOGOS.ep,
  },
  {
    id: "epapp",
    name: "EPapp",
    path: "/epapp",
    label: "ORTA & BÜYÜK İŞLETMELER",
    tagline: "Orta ve büyük ölçekli işletmeler için dijital satış altyapısı",
    title: "Tüm satış kanallarınız. Tek altyapı.",
    desc: "Pazaryeri entegrasyonları, personel uygulaması ve markanıza özel sipariş sistemi.",
    tags: ["Entegrasyon", "Personel App", "Mobil Uygulama", "Web", "Çoklu Şube"],
    cta: "EPapp'i Keşfet",
    logo: LOGOS.epapp,
  },
  {
    id: "epkurye",
    name: "EPkurye",
    path: "/epkurye",
    label: "TESLİMAT OPERASYONU",
    tagline: "Teslimat ve kurye operasyonu",
    title: "Teslimatı bize bırakın.",
    desc: "Hemen teslim, randevulu teslim, moto kurye ve frigolu panelvan çözümleri.",
    tags: ["30–45 dk", "3,5 km", "Randevulu", "Moto Kurye", "Frigolu"],
    cta: "EPkurye'yi Keşfet",
    logo: LOGOS.epkurye,
  },
  {
    id: "epfood",
    name: "EPfood",
    path: "/epfood",
    label: "RESTORAN & YEME-İÇME",
    tagline: "Restoran ve yeme-içme işletmeleri için dijital satış",
    title: "Restoranınızı dijital satışa hazırlayın.",
    desc: "Panel kurulumu, menü, opsiyonlar, görseller, sipariş yönetimi ve teslimat.",
    tags: ["Panel", "Menü", "Opsiyon", "Görsel", "Sipariş", "Kurye"],
    cta: "EPfood'u Keşfet",
    logo: LOGOS.epfood,
  },
];

export const NAV_LINKS = [
  { label: "Çözümler", href: "/#cozumler", mega: true },
  { label: "Nasıl Çalışır", href: "/#ekosistem" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

// Gerçek referans markalar. Doğrulanmış veri olmadığı için yalnızca logo, marka adı ve
// kullanılan hizmetler gösterilir; performans rakamı / şube sayısı / sonuç metni YOK.
// Gerçek logo dosyaları /public/assets/references altına eklenince `logo` alanı doldurulur
// (marquee ve kartlar otomatik olarak logoya geçer).
export const REFERENCES = [
  { id: "sibela", solution: "ep", name: "Sibela Supermarket", logo: null, services: ["Pazaryeri Operasyonu", "EP Uygulaması"] },
  { id: "tek-gross", solution: "ep", name: "Tek Gross", logo: null, services: ["Pazaryeri Operasyonu", "Stok & Fiyat"] },
  { id: "show", solution: "ep", name: "Show Supermarket", logo: null, services: ["Pazaryeri Operasyonu", "EP Uygulaması"] },
  { id: "baris-gross", solution: "ep", name: "Barış Gross", logo: null, services: ["Pazaryeri Operasyonu", "EP Uygulaması"] },
  { id: "vatan", solution: "epapp", name: "Vatan", logo: null, services: ["Pazaryeri Entegrasyonu", "Personel Uygulaması"] },
  { id: "bronto", solution: "epkurye", name: "Bronto", logo: null, services: ["Kurye", "Randevulu Teslim"] },
  { id: "carrefour", solution: "epkurye", name: "Carrefour", logo: null, services: ["Kurye", "Hemen Teslim"] },
  { id: "baytar-burger", solution: "epfood", name: "Baytar Burger", logo: null, services: ["Menü Kurulumu", "Sipariş Ekranı", "Kurye"] },
];

// Metrikler: yalnızca brief'te verilen değer gerçek placeholder olarak gösterilir.
// Diğerleri bilinçli olarak boş bırakıldı (uydurma rakam yok). Gerçek veri gelince doldurulacak.
export const METRICS = [
  { value: 50, suffix: "K+", label: "Yönetilen Ürün" },
  { value: null, suffix: "+", label: "Aktif İşletme" },
  { value: null, suffix: "+", label: "Şube" },
  { value: null, suffix: "+", label: "Sipariş" },
];

export const EP_PRICING = [
  {
    name: "EP Başlangıç",
    price: "1.990",
    features: ["1 platform", "500 ürüne kadar", "Mağaza açılışı", "İlk ürün yükleme", "EP uygulaması", "Temel destek"],
    featured: false,
  },
  {
    name: "EP Plus",
    price: "3.999",
    badge: "En Çok Tercih Edilen",
    features: ["3 platform", "2.000 ürüne kadar", "Mağaza açılışı", "İlk ürün yükleme", "EP uygulaması", "Stok & fiyat yönetimi", "Öncelikli destek"],
    featured: true,
  },
  {
    name: "EP Pro",
    price: "6.999",
    features: ["Tüm desteklenen platformlar", "5.000 ürüne kadar", "Mağaza açılışı", "İlk ürün yükleme", "EP uygulaması", "Gelişmiş raporlama", "Öncelikli destek"],
    featured: false,
  },
];

export const EP_FAQ = [
  {
    q: "EP hangi işletmeler için uygun?",
    a: "Market, kasap, manav, şarküteri, petshop ve su bayii gibi tek şubeli veya az şubeli işletmeler için tasarlandı. İşletmenizi desteklenen pazaryerlerinde satışa açıyor, operasyonu sizin adınıza yönetiyoruz.",
  },
  {
    q: "Hangi pazaryerlerinde satışa açılabilirim?",
    a: "Trendyol Go Market, Yemeksepeti Mahalle ve Getir Çarşı başta olmak üzere desteklenen platformlarda mağazanızı açıyoruz. Platform kapsamı paketinize göre değişir.",
  },
  {
    q: "Ürünlerimi kim yüklüyor?",
    a: "İlk ürün yüklemesi tüm paketlerde bizim tarafımızdan yapılır. Sonrasında EP uygulaması ile barkod okutarak ürün bulabilir, fiyat ve stok güncelleyebilirsiniz.",
  },
  {
    q: "Stok ve fiyat yönetimi nasıl işliyor?",
    a: "EP Plus ve EP Pro paketlerinde stok ve fiyat süreçlerini birlikte yönetiyoruz. Kampanya taleplerinizi de EP uygulaması üzerinden bize iletebilirsiniz.",
  },
  {
    q: "Teslimatı kim yapıyor?",
    a: "Dilerseniz teslimat operasyonunuzu EPkurye üstlenir. 30–45 dakika hemen teslim, randevulu teslim ve moto kurye seçenekleriyle siparişten kapıya kadar tüm süreci yönetebiliriz.",
  },
];

export const BRANCH_OPTIONS = ["1 Şube", "2–5 Şube", "6–20 Şube", "21–50 Şube", "51–100 Şube", "100+ Şube"];
