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

## Güncellemeler (12 Eylül 2026 — tur 2)
- Ürün isimleri site genelinde standartlaştırıldı: EP, EPapp, EPkurye, EPfood (tüm eski varyasyonlar temizlendi; logo assetleri orijinal haliyle korunuyor)
- Yeni EPkurye logosu işlenip eskisinin yerine kondu (/public/assets/logos/epkurye.png)
- Favicon: yeşil daire beyaz "e", daire dışı tamamen transparan; 16/32/48/180/192/512 PNG + ICO seti üretildi
- Gerçek referanslar eklendi (Bronto, Vatan, Sibela Supermarket, Tek Gross, Show Supermarket, Barış Gross, Carrefour, Baytar Burger) — yalnızca logo/marka/hizmet alanları; uydurma metrik yok. `logo: null` → gerçek logo gelince otomatik geçiş. Monogram fallback
- Resend (Emergent managed) e-posta entegrasyonu: her lead'de (1) ekibe bildirim (LEAD_NOTIFICATION_EMAIL), (2) kullanıcıya "Talebinizi Aldık | Epersonel" onayı. Guardrail gate (_assert_safe_email) her gönderimde çalışıyor. /app/backend/.env.example eklendi
- Şube sayısı seçenekleri "2–5 Şube" formatına güncellendi (frontend + backend validasyonu tutarlı)
- İletişim kartları merkezi CONTACT config'ine bağlandı (site.js): e-posta info@epersonelapp.com (mailto aktif), telefon/WhatsApp null → "Yakında" (sahte numara yok)

## Güncellemeler (12 Eylül 2026 — tur 3)
- Header "Çözümler" tetikleyicisi otomatik dönen alana çevrildi: Çözümler → EP → EPapp → EPkurye → EPfood logoları (2.2s, fade+slide, sabit container, layout shift yok). Hover/focus'ta rotasyon durur ve "Çözümler"e döner; çıkıştan ~650ms sonra devam eder. Mobilde rotasyon yok. prefers-reduced-motion destekli
- Epersonel ana logosu yeni yüklenen dosyadan temizlendi (transparan zemin, dengeli crop, halo temizliği) — header/footer/ekosistem/admin genelinde aynı asset
- EPkurye logosu doğru dosyayla değiştirildi (kullanıcının "kurye (2).png" adlı dosyası aslında Epersonel wordmark'ı içeriyordu; eşleşme düzeltildi)
- Referans kartlarından monogram kaldırıldı (kullanıcı kuralı: sahte logo/monogram yok); yalnızca marka adı + hizmetler, gerçek logo gelince otomatik geçiş
- Talep Paneli (/admin) eklendi: JWT auth (bcrypt, httpOnly cookie + Bearer, brute-force kilidi, env'den seed), KPI kartları (Yeni/Görüşme Bekleyen/Teklif Verilen/Olumlu), filtreler (çözüm/tip/durum/şube/tarih), arama (firma/yetkili/telefon/e-posta), satır detayı, durum değiştirme (6 durum), not ekleme, Ara/WhatsApp/E-posta aksiyonları. Sahte lead üretilmedi. Backend: /api/auth/* + /api/admin/leads (+PATCH status, +POST notes)
- CORS artık FRONTEND_URL ile kısıtlı (credentials uyumlu)

## Güncellemeler (12 Eylül 2026 — tur 4)
- Talep Paneli'ne CSV dışa aktarma eklendi (GET /api/admin/leads/export, yalnızca yetkili kullanıcı, aktif filtre+arama ile uyumlu, UTF-8 BOM + ";" ayraç, 12 TR sütun: tarih/saat ayrı)
- Sayfalama eklendi: 25/50/100 kayıt seçenekleri, sayfa bilgisi ve önceki/sonraki kontrolleri; filtre/arama değişiminde sayfa 1'e döner
- Referans logo altyapısı onaylandı (logo:null → gerçek dosya gelince otomatik geçiş; sahte logo/monogram yok), iletişim numaraları altyapısı onaylandı (CONTACT null → "Yakında"; tel:/wa.me hazır), SEO landing sayfaları kullanıcı kararıyla ertelendi

## Güncellemeler (12 Eylül 2026 — tur 5)
- Talep atama sistemi: ekip üyeleri db.team_members'da (TEAM_MEMBERS env veya POST /api/admin/team ile eklenir; sahte üye yok). PATCH /api/admin/leads/{id}/assign ile atama/değiştirme/"Atanmamış"a alma; her lead'de assignment_history (kime, ne zaman, kim tarafından). Panelde: Atanan Kişi filtresi (+Atanmamış), "Atanmamış Talepler" KPI kartı, listede atanan görünümü, detayda atama select'i + geçmiş
- Doğrulama sonrası test talepleri ve test üyesi DB'den temizlendi (panel gerçek veriyle başlıyor)

## Güncellemeler (12 Eylül 2026 — tur 6)
- Ekip üyesi modeli genişletildi: Ad Soyad, E-posta, Rol, Aktif/Pasif, Atanabilir/Atanamaz (POST /api/admin/team veya TEAM_MEMBERS env). Atama dropdown'ları yalnızca aktif+atanabilir üyeleri gösterir; "Atanmamış" her zaman var. Atanabilir olmayan üyeye atama backend'de 400 ile reddedilir
- Atama bildirim e-postası: talep ilk kez atandığında veya atanan kişi değiştiğinde, atanan üyenin e-postasına "Yeni Talep Size Atandı | [İşletme]" gider (tüm talep alanlarıyla). "Atanmamış" yapılınca mail yok, aynı kişiye tekrar atamada mail yok. Üye e-postası team_members datasından gelir
- Çözüm sırası site genelinde EP → EPapp → EPfood → EPkurye olarak sabitlendi (hero tabları, bento grid, footer, filtreler, form seçenekleri)
- Test kayıtları temizlendi (leads: 0, team: 0)

## Güncellemeler (12 Eylül 2026 — tur 7)
- 4 çözüm sayfasının hero görsel sistemi sıfırdan kuruldu: ortak `SystemVisual` bileşeni (merkez mockup + floating sistem kartları + bağlantı çizgileri + akan veri noktaları + mikro float animasyonları, prefers-reduced-motion destekli). Varyantlar: EP (telefon + Ürün/Stok/Fiyat/Kampanya/Pazaryeri/Barkod + geometrik sepet aksanı), EPapp (büyük dashboard + personel telefonu + 8 modül), EPfood (turuncu vurgulu telefon + Menü/Opsiyon/Ekstra/Görsel/Sipariş/Kurye + mini ürün çipleri), EPkurye (harita + 6 operasyon kartı + rota animasyonu). Mobilde kart sayısı azalır, çizgiler gizlenir. Ürün-reklamı estetiği yok; sistem/operasyon dili

## Güncellemeler (13 Eylül 2026 — tur 8, fork oturumu)
- 25 maddelik büyük revizyon seti tamamlandı: global header rotator hover mantığı, site genelinde çözüm sırası (EP → EPapp → EPfood → EPkurye), EPkurye müşteri pini harita görseli, 3 katmanlı referans sistemi (marquee + çözüm kartları + /referanslar sayfası), Admin Panel referans yönetimi (Emergent Object Storage ile logo yükleme, POST /api/admin/references/{id}/logo), "Küçük işletmeler" gibi premium olmayan ifadeler temizlendi, yeni favicon + çözüm logoları, lead formlarına İl/İlçe bağımlı dropdown (yerel il-ilce.json), public "Giriş Yap" butonu tüm sayfalardan kaldırıldı, EP fiyatlandırmada EP Plus default aktif
- Kritik hata düzeltildi: /ep sayfası lucide-react'ta bulunmayan `Cheese` ikonu import'u yüzünden çöküyordu → `Sandwich` ile değiştirildi, sayfa sorunsuz yükleniyor
- Kapsamlı QA (testing agent, iteration_1): Backend 18/18 pytest geçti (health, auth, lead CRUD/atama, referans CRUD). Frontend 8 public sayfa 0 konsol hatası, "Giriş Yap" hiçbir yerde yok, mega menü sıralaması doğru, iletişim formu uçtan uca çalışıyor (İstanbul→Kadıköy ilçe dolumu + POST 201 + başarı mesajı), admin giriş + lead listesi + durum/atama çalışıyor, mobil 375px'te taşma yok, stok fotoğraf yok
- Test verileri DB'den temizlendi (leads: 0, referanslar: 8 gerçek seed kaydı korundu)

## Backlog (öncelikli)
- P0: Gerçek referans logo dosyaları (/public/assets/references → data'da logo alanı)

## Güncellemeler (13 Eylül 2026 — tur 9)
- Favicon sistemi tamamen yenilendi: kullanıcının yüklediği siyah "e" ikonu (beyaz yuvarlatılmış kare zemin) ana asset alındı, olduğu gibi kullanıldı (crop/recolor/redraw YOK). Yüklenen birebir dosyalar: favicon-16x16, favicon-32x32, apple-touch-icon (180), android-chrome-192, android-chrome-512. favicon-48x48 master'dan Lanczos ile üretildi. favicon.ico manuel ICO container ile 16+32+48 içerecek şekilde oluşturuldu (PNG-in-ICO). Eski yeşil/turuncu favicon dosyaları aynı isimlerle ezildi, projede başka favicon kalıntısı/referansı yok
- index.html favicon metadata'sı güncellendi: favicon.ico (sizes="any") + 16/32/48/192/512 PNG + apple-touch-icon + manifest. site.webmanifest android-chrome ikonlarını kullanıyor (zaten doğru yapıdaydı). Not: public/index.html değişiklikleri webpack-dev-server tarafından bellekten sunulduğu için frontend restart gerekli
- P0: Gerçek telefon / WhatsApp numaraları (site.js CONTACT)

## Güncellemeler (13 Eylül 2026 — tur 10): EPkurye → EPgo marka dönüşümü
- EPkurye markası site genelinde EPgo oldu (tüm varyasyonlar temizlendi: EPKURYE/ePKURYE/epkurye/"EP Kurye"); "kurye" kelimesi genel hizmet adı olarak bilinçli korunuyor
- URL: /epkurye → /epgo (eski adres React Navigate ile /epgo'ya redirect ediyor); EpkuryePage.jsx → EpgoPage.jsx (tüm testid'ler epgo-*)
- Yeni EPgo logosu (yeşil "e" + siyah "GO", kullanıcı asseti): yalnızca tamamen transparan kenar boşlukları temizlendi (500x500 → 426x125, tasarım/renk/oran aynı), /assets/logos/epgo.png; eski epkurye.png silindi. Kullanım: header rotator, mega menu, mobil menu, ana sayfa hero/bento, EPgo sayfası, EP/EPapp/EPfood cross-sell bantları, EcosystemFlow
- Sabit çözüm sırası her yerde: EP → EPapp → EPfood → EPgo (header, mega/mobil menü, hero tabları, bento, form dropdown, footer, admin)
- Footer Çözümler bölümü TAM BÜYÜK HARF: EP / EPAPP / EPFOOD / EPGO (s.name.toUpperCase(); diğer alanlarda EPgo standardı)
- Backend: solution id "epgo", show_epkurye → show_epgo (REF_FIELDS/_ref_out/ReferenceUpsert/seed), "EPgo Teslimat Teklifi" etiketi, SOLUTION_LABELS. DB migrasyonu: 8 referansta alan rename + Bronto/Carrefour solutions=["epgo"], lead normalize (0 kayıt vardı)
- SEO: /epgo title/OG/JSON-LD/canonical, sitemap.xml ve llms.txt güncellendi

## Güncellemeler (14 Eylül 2026 — tur 11): Büyük UI sadeleştirme revizyonları
- Ana sayfa hero: 4 ayrı karmaşık sahne yerine TEK birleşik sistem sahnesi (yeni `HeroSystem.jsx`) — sabit merkez hub (epersonel logosu + "Tek Sistem · Canlı" pulse), 5 sabit slotta modül kartları; tab değişiminde sahne remount olmaz, modüller yerinde crossfade olur (EP: Ürün/Stok/Pazaryeri/Fiyat/Barkod, EPapp: Pazaryeri/Personel App/Web & Mobil/Admin Panel, EPfood: Menü/Opsiyon/Sipariş/Ürün Görseli/Restoran, EPgo: Rota/Kurye/Teslimat/Müşteri/Kapsama)
- Orta bölüm: eski "ÜRÜNÜ GÖRÜN" DashboardMock showcase kaldırıldı → yeni `StepsShowcase.jsx` "4 adımda işletmenizi e-ticarete taşıyın." (01 Entegre et → 02 Sipariş al → 03 Hazırla → 04 Teslim et; 5.2sn otomatik rotasyon + manuel seçim 16sn pause; her adımda mini sistem mockup'ı; akış metni şeridi)
- Metrikler güncellendi: 100K+ Yönetilen Ürün, 70+ Firma Epersonel'de, 150+ Şube/Panel, 15K+ Yönetilen Sipariş
- Sosyal ikonlar: yeni özel SVG set (`SocialIcons.jsx`, yumuşak köşeli stroke ikonlar) — footer + iletişim sayfasında; hover: lift + ink bg
- WhatsApp iletişimden tamamen kaldırıldı (kart + CONTACT.whatsapp alanı); iletişimde Telefon/E-posta/Instagram/LinkedIn kartları. Admin lead aksiyonundaki WhatsApp butonu bilinçli duruyor
- EP pricing seçili state: çift katmanlı yeşil glow + üst blur halo + -translate-y-2 + koyu badge (yeşil pulse noktalı); pasif kartlara hover lift
- EPapp hero: yeni `EpappFlow.jsx` — 3 eksen akışı (Pazaryerleri → EPapp Sipariş Merkezi hub (dönen sipariş ticker'ı) → Personel App + Admin Panel + Web & Mobil)
- EPgo hero: yeni `EpgoMap.jsx` — tek sade sahne: merkez Mağaza + 3,5 km kapsama çemberi + 2 müşteri pini + moto kurye (A) + araçlı kurye (B) + "30–45 dakika hemen teslim / Frigolu teslim / Randevulu teslim" etiketleri

## Güncellemeler (14 Eylül 2026 — tur 12): EPgo kurye görseli
- Kullanıcının yüklediği kurye görseli (beyaz scooter + EPgo logolu çanta/mont + kasklı kurye + market poşeti) EPgo sayfasındaki koyu "İşletmeye Özel Frigolu Panelvan" CTA bandının sağ kolonuna ana görsel olarak yerleştirildi
- Görsel aslında transparan zeminli RGBA çıktı (önizlemede beyaz görünüyordu) → koyu zemine doğrudan oturdu; WebP q90 (39KB, alfa korunmuş) olarak /assets/epgo-kurye.webp
- Zayıf görünen "Kontrollü teslimat" liste paneli kaldırıldı; yerine: alt hizalı büyük görsel (lg: 430px) + arkada brand yeşili radial glow + drop-shadow derinliği + yumuşak float animasyonu (reduced-motion güvenli) + giriş reveal'ı
- Mobil: görsel 320px'e küçülüyor, metin/CTA altında ortalanıyor, yatay taşma yok
- Doğrulama: desktop + mobil (375px) ekran görüntüleriyle kompozisyon, kontrast ve responsive davranış onaylandı

## Güncellemeler (14 Eylül 2026 — tur 13): EPgo final kurye görseli
- Kullanıcının yüklediği FINAL PNG (panelvan + kurye + scooter + yeşil yay, 612x408 RGBA transparan zemin) hash doğrulamalı birebir kopyayla /assets/epgo-kurye.png olarak yerleştirildi — dosyaya hiçbir işlem yapılmadı (dönüştürme/sıkıştırma/crop/renk/filtre YOK); önceki webp silindi
- Yerleşim yalnızca CSS: w-full, max-w-[540px], h-auto, object-contain, responsive; arkada CSS dekoru olarak geniş yeşil glow (görsel içeriğine dokunmuyor), drop-shadow kaldırıldı

## Güncellemeler (14 Eylül 2026 — tur 14): Scooterlı EPgo görseli, CTA bantları
- Kullanıcının yüklediği scooterlı EPgo görseli (666x375 RGBA transparan) hash doğrulamalı birebir kopyayla /assets/epgo-scooter.png olarak eklendi — içeriğe sıfır müdahale
- Yerleşim: koyu EPgo tanıtım bantlarının sağ alanına katmanlı kompozisyon — (1) bant zemini + hafif yeşil CSS glow, (2) scooter görseli (object-contain, absolute, z-0), (3) "EPgo'yu Keşfet" CTA'sı en önde (relative z-10, altta hizalı); buton metni/yeri/variant'ı değişmedi, elementFromPoint ile tıklanabilirliği doğrulandı
- Uygulandığı yerler: /ep cross-sell bandı (bg-coal, yeşil CTA) ve /epfood EPgo bandı (bg-ink; CTA mevcut turuncu accent sistemini koruyor). EpfoodPage'den kullanılmayan ArrowDown importu temizlendi
- Mobil: görsel metnin altına geçiyor, 375px'te taşma yok
- Not: Kullanıcı bloğu "EPgo sayfasındaki" diye tarif etti ancak "EPgo'yu Keşfet" butonu /ep ve /epfood bantlarında bulunuyor; her ikisine uygulandı

## Güncellemeler (14 Eylül 2026 — tur 15): eOrder görseli + CTA görsel büyütme + mobil taşma fixi
- EPapp "Personel Uygulaması" (FeatureRow 05): sağdaki PhoneMock kaldırıldı, yerine kullanıcının yüklediği GERÇEK eOrder personel uygulaması görseli (3 telefon ekranı, 1122x1402 RGBA transparan) hash doğrulamalı birebir kopya /assets/eorder-personel.png — içeriğe sıfır müdahale; CSS-only: w-full max-w-[520px] h-auto object-contain, mobilde metin altında responsive. Sol başlık/açıklama/chipler korundu
- Scooter görseli güncellendi: kullanıcının son yüklediği sade versiyon (612x408) birebir kopyayla epgo-scooter.png üzerine yazıldı; CTA bantlarında görsel ~%30 büyütüldü (container lg 360x224 → 440x272, render 408x272), buton katmanı (z-10) korundu
- Mobil yatay taşma düzeltmesi: FeatureRow grid kolonlarına min-w-0 (EpfoodPage + EpappPage), DashboardMock tablo sarmalayıcısı overflow-x-auto (küçük ekranda kart içi kaydırma), glow dekorları mobilde küçültüldü (w-64 sm:w-80 lg:w-96) + bant/section'lara overflow-hidden. Doğrulama: /ep, /epfood, /epapp 375px'te scrollWidth=375

## Güncellemeler (14 Eylül 2026 — tur 16)
- EPapp "Personel Uygulaması" eOrder görseli kullanıcı isteğiyle ~%12 küçültüldü: max-w-[520px] → max-w-[455px] (render 520x650 → 455x569); yalnızca CSS, görsel içeriği aynı; desktop/mobil taşma yok

## Güncellemeler (14 Eylül 2026 — tur 17): EPapp Admin Panel gerçek görsel
- EPapp "Admin Panel" bölümü (FeatureRow 06, reverse): soldaki interaktif mockup (AdminPanel bileşeni + ADMIN_TABS + DashboardMock sekmeleri) kaldırıldı, yerine kullanıcının yüklediği GERÇEK eOrder admin panel görseli (masaüstü + laptop + ürün/stok/kullanıcı kartları, 1122x1402 RGBA transparan) hash doğrulamalı birebir kopya /assets/eorder-admin.png — içeriğe sıfır müdahale

## Güncellemeler (14 Eylül 2026 — tur 18)
- EPapp "Admin Panel" eOrder görseli kullanıcı isteğiyle ~%14 küçültüldü: max-w-[540px] → max-w-[465px] (render 540x675 → 465x581); yalnızca CSS, görsel içeriği aynı; desktop/mobil taşma yok

## Güncellemeler (14 Eylül 2026 — tur 19): EPapp çoklu şube bölümü gerçek dashboard
- EPapp "Bir şubeden yüzlerce şubeye." (FeatureRow 07): sağdaki DashboardMock(subeler) mockup'ı kaldırıldı, yerine kullanıcının yüklediği GERÇEK eOrder dashboard görseli (browser frame, sipariş kartları + son işlemler tablosu + QR, 666x375 RGBA transparan) hash doğrulamalı birebir kopya /assets/eorder-dashboard.png — içeriğe sıfır müdahale

## Güncellemeler (14 Eylül 2026 — tur 20)
- EPapp "Bir şubeden yüzlerce şubeye." dashboard görseli kullanıcı isteğiyle ~%12 büyütüldü: img'e lg:scale-[1.12] (layout'u bozmadan saf görsel büyütme; render 568x320 → 636x358); metin kolonuyla çakışma yok (46px boşluk), desktop/mobil taşma yok, mobil boyut aynı (335x189)

## Güncellemeler (14 Eylül 2026 — tur 21): EPapp marka kanalı gerçek görsel
- EPapp "Markaya Özel Mobil & Web" koyu bölümü (BrandChannel): sağdaki BrandChannelVisual mockup'ı (web mockup + köşe telefonu + iOS/Android/Web çipleri) kaldırıldı, yerine kullanıcının yüklediği GERÇEK birleşik görsel (web sipariş sitesi + mobil ana sayfa + ürün listeleme + ödeme ekranı, 1448x1086 RGBA transparan) hash doğrulamalı birebir kopya /assets/epapp-brand-channel.png — içeriğe sıfır müdahale, kart/stroke eklemeden doğrudan koyu zeminde
- CSS-only yerleşim: w-full h-auto object-contain (desktop 568x426, mobil 335x251 metin/CTA altında); sol içerik (eyebrow/başlık/açıklama/12 chip/Teklif Talep Et) korundu

## Güncellemeler (14 Eylül 2026 — tur 22)
- EPapp "Markaya Özel Mobil & Web" birleşik görseli kullanıcı isteğiyle %20 büyütüldü: lg:scale-[1.2] (render 568x426 → 682x511); metinle çakışma yok (400px+ boşluk), desktop/mobil taşma yok, mobil boyut aynı (335x251)
- Temizlik: BrandChannelVisual silindi; PhoneMock'un personel varyantı (PersonelScreen) artık hiçbir yerde kullanılmadığı için kaldırıldı; kullanılmayan importlar (PhoneMock EpappPage'den, Clock3/Package PhoneMock'tan) temizlendi
- CSS-only yerleşim: w-full h-auto object-contain (desktop 568x320, mobil 335x189 metin altında); sol başlık/açıklama korundu; DashboardMock bileşeni diğer bölümlerde (stok/fiyat) kullanılmaya devam ediyor
- CSS-only yerleşim: w-full max-w-[540px] h-auto object-contain; sağdaki başlık/açıklama korundu; mobilde metin altında responsive (375px'te taşma yok). Kullanılmayan AdminPanel/ADMIN_TABS kodu ve useState importu temizlendi
- Doğrulama: desktop 532x355 render (tam kompozisyon görünür), mobil 375px'te 255x170 taşmasız; alt metin panelvan/kurye/scooter içerecek şekilde güncellendi
- Temizlik: MapMock.jsx silindi; SystemVisual sadece ep/epfood varyantlarına indirildi; DashboardMock yalnızca EPapp alt bölümlerinde
- LogoBand marquee zaten gereksinimleri karşılıyordu (70sn loop, hover-pause, reduced-motion) — will-change eklendi
- Doğrulama (testing agent, iteration_3): frontend %100 — tüm yeni bileşenler, metrikler, footer büyük harf, WhatsApp yokluğu, pricing state, mobil 375px taşmasız, konsol temiz. Advisory notlar: pricing testid Türkçe slug (pricing-ep-başlangıç), metrikler scroll-into-view ile sayar (beklenen davranış)
- Doğrulama (testing agent, iteration_2): backend 18/18 pytest, tüm sayfalarda eski marka izi yok, redirect/logo/footer/form/admin akışları tamamı geçti. Test verileri temizlendi (leads: 0, referanslar: 8 gerçek)
- P0: Gerçek metrikler (Aktif İşletme / Şube / Sipariş)
- P1: SEO landing sayfaları (kullanıcı kararıyla ertelendi): /pazaryeri-entegrasyonu, /trendyol-entegrasyonu, /yemeksepeti-entegrasyonu, /getir-entegrasyonu, /restoran-siparis-entegrasyonu, /kurye-hizmeti — mimari hazır (Seo + SectionHead + FeatureRow pattern)
- P1: Admin "gelen talepler" görüntüleme sayfası
- P1: Gerçek uygulama ekran görüntüleriyle mockup değişimi
- P2: Müşteri paneli "Giriş Yap", sosyal medya hesapları, yasal metinlerin hukuki onayı, sitemap/robots alan adı güncellemesi
