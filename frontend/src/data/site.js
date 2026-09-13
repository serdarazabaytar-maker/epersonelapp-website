// Site genelinde kullanılan içerik verileri.
// Bu dosya merkezi config görevi görür; iletişim, metrik ve içerik güncellemeleri buradan yapılır.

export const LOGOS = {
  epersonel: "/assets/logos/epersonel.png",
  ep: "/assets/logos/ep.png",
  epapp: "/assets/logos/epapp.png",
  epkurye: "/assets/logos/epkurye.png",
  epfood: "/assets/logos/epfood.png",
};

// Merkezi iletişim bilgileri — tüm componentler buradan beslenir, hard-code yok.
// WhatsApp numarası verilene kadar null kalır (public'te yanlış link gösterilmez).
export const CONTACT = {
  email: "info@epersonelapp.com",
  phone: "+90 (212) 000 00 00",
  phoneTel: "+902120000000",
  whatsapp: null,
  instagram: "https://www.instagram.com/epersonel",
  linkedin: "https://www.linkedin.com/company/epersonel",
};

// Çözüm sırası site genelinde sabit: EP → EPapp → EPfood → EPkurye
export const SOLUTIONS = [
  {
    id: "ep",
    name: "EP",
    path: "/ep",
    label: "YEREL İŞLETMELER",
    tagline: "Yerel işletmeler için pazaryeri operasyonu",
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
    label: "ÇOK ŞUBELİ İŞLETMELER",
    tagline: "Çok şubeli işletmeler için dijital satış altyapısı",
    title: "Tüm satış kanallarınız. Tek altyapı.",
    desc: "Pazaryeri entegrasyonları, personel uygulaması ve markanıza özel sipariş sistemi.",
    tags: ["Entegrasyon", "Personel App", "Mobil Uygulama", "Web", "Çoklu Şube"],
    cta: "EPapp'i Keşfet",
    logo: LOGOS.epapp,
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
];

export const NAV_LINKS = [
  { label: "Çözümler", href: "/#cozumler", mega: true },
  { label: "Nasıl Çalışır", href: "/#ekosistem" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export const METRICS = [
  { value: 50, suffix: "K+", label: "Yönetilen Ürün" },
  { value: 30, suffix: "+", label: "Aktif İşletme" },
  { value: 50, suffix: "+", label: "Şube / Panel" },
  { value: 10, suffix: "K+", label: "Yönetilen Sipariş" },
];

export const EP_PRICING = [
  {
    name: "EP Başlangıç",
    price: "1.990",
    features: ["1 platform", "500 ürüne kadar", "Mağaza açılışı", "İlk ürün yükleme", "EP uygulaması", "Temel destek"],
  },
  {
    name: "EP Plus",
    price: "3.999",
    badge: "En Çok Tercih Edilen",
    features: ["3 platform", "2.000 ürüne kadar", "Mağaza açılışı", "İlk ürün yükleme", "EP uygulaması", "Stok & fiyat yönetimi", "Öncelikli destek"],
  },
  {
    name: "EP Pro",
    price: "6.999",
    features: ["Tüm desteklenen platformlar", "5.000 ürüne kadar", "Mağaza açılışı", "İlk ürün yükleme", "EP uygulaması", "Gelişmiş raporlama", "Öncelikli destek"],
  },
];

export const EP_FAQ = [
  {
    q: "EP hangi işletmeler için uygun?",
    a: "Market, kasap, manav, şarküteri, petshop ve su bayii gibi yerel işletmeler için tasarlandı. İşletmenizi desteklenen pazaryerlerinde satışa açıyor, operasyonu sizin adınıza yönetiyoruz.",
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
    a: "EP Plus ve EP Pro paketlerinde stok ve fiyat süreçlerinizi birlikte yönetiyoruz. Kampanya taleplerinizi de EP uygulaması üzerinden bize iletebilirsiniz.",
  },
  {
    q: "Teslimatı kim yapıyor?",
    a: "Dilerseniz teslimat operasyonunuzu EPkurye üstlenir. 30–45 dakika hemen teslim, randevulu teslim ve moto kurye seçenekleriyle siparişten kapıya kadar tüm süreci yönetebiliriz.",
  },
];

export const BRANCH_OPTIONS = ["1 Şube", "2–5 Şube", "6–20 Şube", "21–50 Şube", "51–100 Şube", "100+ Şube"];
