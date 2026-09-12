// Site genelinde kullanılan içerik verileri.
// NOT: Referanslar, vaka çalışmaları ve bazı metrikler bilinçli olarak placeholder'dır;
// gerçek veriler geldiğinde bu dosya (veya ileride CMS) üzerinden güncellenecek.

export const LOGOS = {
  epersonel: "/assets/logos/epersonel.png",
  ep: "/assets/logos/ep.png",
  epapp: "/assets/logos/epapp.png",
  epkurye: "/assets/logos/epkurye.png",
  epfood: "/assets/logos/epfood.png",
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
    name: "ePAPP",
    path: "/epapp",
    label: "ORTA & BÜYÜK İŞLETMELER",
    tagline: "Orta ve büyük ölçekli işletmeler için dijital satış altyapısı",
    title: "Tüm satış kanallarınız. Tek altyapı.",
    desc: "Pazaryeri entegrasyonları, personel uygulaması ve markanıza özel sipariş sistemi.",
    tags: ["Entegrasyon", "Personel App", "Mobil Uygulama", "Web", "Çoklu Şube"],
    cta: "ePAPP'i Keşfet",
    logo: LOGOS.epapp,
  },
  {
    id: "epkurye",
    name: "ePKURYE",
    path: "/epkurye",
    label: "TESLİMAT OPERASYONU",
    tagline: "Teslimat ve kurye operasyonu",
    title: "Teslimatı bize bırakın.",
    desc: "Hemen teslim, randevulu teslim, moto kurye ve frigolu panelvan çözümleri.",
    tags: ["30–45 dk", "3,5 km", "Randevulu", "Moto Kurye", "Frigolu"],
    cta: "ePKURYE'yi Keşfet",
    logo: LOGOS.epkurye,
  },
  {
    id: "epfood",
    name: "ePFOOD",
    path: "/epfood",
    label: "RESTORAN & YEME-İÇME",
    tagline: "Restoran ve yeme-içme işletmeleri için dijital satış",
    title: "Restoranınızı dijital satışa hazırlayın.",
    desc: "Panel kurulumu, menü, opsiyonlar, görseller, sipariş yönetimi ve teslimat.",
    tags: ["Panel", "Menü", "Opsiyon", "Görsel", "Sipariş", "Kurye"],
    cta: "ePFOOD'u Keşfet",
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

// Placeholder referanslar — gerçek logo ve vaka verileri eklenecek. İstatistik uydurulmamıştır.
export const REFERENCES = [
  { id: 1, solution: "ep", name: "Marka Adı", branches: null, services: ["Pazaryeri Operasyonu", "EP Uygulaması"] },
  { id: 2, solution: "ep", name: "Marka Adı", branches: null, services: ["Pazaryeri Operasyonu", "Stok & Fiyat"] },
  { id: 3, solution: "epapp", name: "Marka Adı", branches: null, services: ["ePAPP", "Personel Uygulaması"] },
  { id: 4, solution: "epapp", name: "Marka Adı", branches: null, services: ["ePAPP", "Çoklu Şube", "Kurye"] },
  { id: 5, solution: "epkurye", name: "Marka Adı", branches: null, services: ["Kurye", "Randevulu Teslim"] },
  { id: 6, solution: "epfood", name: "Marka Adı", branches: null, services: ["Menü Kurulumu", "Sipariş Ekranı", "Kurye"] },
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
    a: "EP Plus ve EP Pro paketlerinde stok ve fiyat süreçlerinizi birlikte yönetiyoruz. Kampanya taleplerinizi de EP uygulaması üzerinden bize iletebilirsiniz.",
  },
  {
    q: "Teslimatı kim yapıyor?",
    a: "Dilerseniz teslimat operasyonunuzu ePKURYE üstlenir. 30–45 dakika hemen teslim, randevulu teslim ve moto kurye seçenekleriyle siparişten kapıya kadar tüm süreci yönetebiliriz.",
  },
];

export const BRANCH_OPTIONS = ["1 Şube", "2–5", "6–20", "21–50", "51–100", "100+"];
