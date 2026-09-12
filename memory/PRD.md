# EPERSONEL — Kurumsal Web Sitesi PRD

## Orijinal Problem
Epersonel (teknoloji + operasyon şirketi) için sıfırdan, production kalitesinde, responsive, premium kurumsal web sitesi. 4 alt çözüm: EP (küçük işletme pazaryeri operasyonu), ePAPP (orta/büyük ölçek dijital satış altyapısı), ePKURYE (teslimat/kurye), ePFOOD (restoran dijital satış — turuncu vurgu). Amaç: bilgi vermek değil, ziyaretçiyi doğru ürüne yönlendirip görüşme/teklif talebine çevirmek.

## Mimari
- Frontend: React 19 + react-router-dom 7 + Tailwind CSS + Framer Motion + Lenis (smooth scroll). CRA/craco ortamı (Next.js yerine, ortam kısıtı nedeniyle; tüm URL yapısı birebir korundu).
- Backend: FastAPI, `/api` prefix, MongoDB (motor). Tek endpoint ailesi: `POST /api/leads` (form talepleri), `GET /api/health`.
- Logolar: `/app/frontend/public/assets/logos/*.png` (gerçek marka assetleri, kenar beyazları temizlendi, transparan). Favicon: `/public/favicon.png` (kullanıcının gönderdiği yeşil "e" ikonu).
- Renkler: #FFFFFF / #F6F7F6 / #101110 / #656A65 / #E7E9E7, marka yeşili #42FF00 (logo'dan örneklendi), ePFOOD turuncusu #FF9500 (sayfa bazlı `--brand-rgb` değişimi).
- Font: Manrope (400–800).

## Kullanıcı Personaları
1. Küçük işletme sahibi (market, kasap, manav...) → /ep, fiyat görür, "Hemen Başla"
2. Zincir/orta-büyük işletme yöneticisi → /epapp, fiyat görmez, "Teklif Talep Et"
3. Teslimat ihtiyacı olan işletme → /epkurye, "Teslimat Teklifi Al" (teslimata özel sorular)
4. Restoran işletmecisi → /epfood, "Restoranınız İçin Teklif Al"

## Uygulananlar (12 Eylül 2026)
- 8 ana rota: /, /ep, /epapp, /epkurye, /epfood, /referanslar, /hakkimizda, /iletisim + 3 yasal sayfa (/kvkk, /gizlilik-politikasi, /cerez-politikasi)
- Sticky blur header, "Çözümler" mega menu (gerçek logolarla), mobil hamburger menü
- Kinetik hero: maskeli satır-satır başlık reveal, 4 otomatik dönen + tıklanabilir tab (EP/ePAPP/ePKURYE/ePFOOD), progress bar, parallax
- Referans logo bandı: yavaş marquee, placeholder yapı (gerçek logolar bekleniyor)
- 2x2 bento çözümler grid'i, dark "Tek Ekosistem" akış diyagramı (animasyonlu noktalar)
- Ürün showcase: 6 tab'lı mock dashboard (Siparişler/Ürünler/Stok/Fiyat/Personel/Şubeler), mikro animasyonlar
- Metrikler: 50K+ sayaç animasyonu; diğerleri bilinçli "—" placeholder (uydurma rakam yok)
- "Neden Epersonel" numaralı manifesto bölümü (01–04)
- EP sayfası: sektörler, 6 adımlı akış, EP uygulaması özellikleri + telefon mockupları, 3 paketli fiyatlandırma (Plus öne çıkan), ePKURYE cross-sell, SSS, referanslar, başvuru formu
- ePAPP: 9 numaralı özellik bölümü (entegrasyonlar, stok, fiyat, slot, personel app, admin panel, markaya özel app, çoklu şube, ePKURYE), fiyat YOK
- ePKURYE: animasyonlu harita (3,5 km, kurye rotası), 3 hizmet kartı + premium frigolu panelvan bölümü, teslimat katmanı akışı
- ePFOOD: turuncu vurgu, panel kurulumu, menü, opsiyon/ekstra mockup, öncesi/sonrası slider, tek ekran sipariş, ePKURYE bandı
- Formlar: 5 zorunlu alan, TR telefon maskesi (0 (5XX) XXX XX XX), e-posta validasyonu, KVKK checkbox, sayfaya özel buton metinleri, premium success state; POST /api/leads → MongoDB `leads` koleksiyonu (CRM/e-posta entegrasyon noktası yorumla işaretli)
- SEO: sayfa bazlı title/description/OG/canonical, Organization + Service JSON-LD, robots.txt, sitemap.xml, llms.txt
- Erişilebilirlik: aria etiketleri, focus-visible, prefers-reduced-motion desteği

## Placeholder / Bekleyen Veriler
- Referans logoları + vaka çalışması içerikleri (component yapısı hazır, /src/data/site.js REFERENCES)
- Metrikler: Aktif İşletme / Şube / Sipariş değerleri ("—")
- İletişim kartları: Telefon / WhatsApp / E-posta değerleri ("Bilgi ekleniyor")
- "Giriş Yap" butonu (müşteri paneli yok)
- Sosyal medya linkleri
- Yasal metinler hukuki inceleme bekliyor
- sitemap.xml / robots.txt alan adı yayında güncellenecek

## Backlog (öncelikli)
- P0: Gerçek referans logoları + vaka çalışmaları, gerçek iletişim bilgileri, gerçek metrikler
- P0: Form bildirimleri için CRM/e-posta (Resend) entegrasyonu (backend'de entegrasyon noktası hazır)
- P1: Admin "gelen talepler" görüntüleme sayfası
- P1: SEO landing sayfaları: /pazaryeri-entegrasyonu, /trendyol-entegrasyonu, /yemeksepeti-entegrasyonu, /getir-entegrasyonu, /restoran-siparis-entegrasyonu, /kurye-hizmeti
- P1: Gerçek uygulama ekran görüntüleriyle mockup değişimi (component'ler buna hazır)
- P2: Müşteri paneli "Giriş Yap", sosyal medya hesapları, blog
