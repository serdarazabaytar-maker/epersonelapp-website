"""Site içerik yönetimi (CMS) API'si.

Public site içerikleri MongoDB'deki `site_content` koleksiyonundan gelir.
Her içerik anahtarı için taslak (draft) / yayın (published) mantığı vardır:
- "Kaydet"        -> draft alanını günceller, public site değişmez
- "Kaydet ve Yayınla" -> data alanını günceller, public site anında yansır

Medya kütüphanesi Emergent Object Storage üzerinde tutulur (`media` koleksiyonu).
server.py tarafından init(db, auth_dep, put_object, get_object) ile başlatılır.
"""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form, Request
from fastapi.responses import Response as RawResponse
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import uuid
import re

router = APIRouter(prefix="/api", tags=["content"])

_db = None
_auth_dep = None
_put_object = None
_get_object = None


def init(*, db, auth_dep, put_object, get_object):
    global _db, _auth_dep, _put_object, _get_object
    _db, _auth_dep, _put_object, _get_object = db, auth_dep, put_object, get_object


async def _admin(request: Request):
    """Tüm admin endpointleri için JWT zorunluluğu (server.py get_current_user'a delege)."""
    return await _auth_dep(request)


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------------------------------------------------------------- varsayılan içerikler
CONTENT_DEFS = {
    "brand": {
        "label": "Marka Assetleri",
        "defaults": {
            "epersonel": "/assets/logos/epersonel.png",
            "ep": "/assets/logos/ep.png",
            "epapp": "/assets/logos/epapp.png",
            "epfood": "/assets/logos/epfood.png",
            "epgo": "/assets/logos/epgo.png",
            "favicon": "/favicon.ico",
            "ogImage": "/og-image.png",
        },
    },
    "home": {
        "label": "Ana Sayfa",
        "defaults": {
            "hero": {
                "eyebrow": "Epersonel Dijital Satış Çözümleri",
                "line1": "İşletmenize uygun",
                "line2": "dijital satış",
                "line3": "altyapısı.",
                "desc": "Pazaryerlerinden kendi sipariş kanalınıza, sipariş yönetiminden teslimata kadar işletmenizin ihtiyacına uygun teknoloji ve operasyon çözümleri.",
                "cta1Text": "Çözümleri Keşfet",
                "cta1Link": "#cozumler",
                "cta2Text": "Görüşme Planla",
                "cta2Link": "/iletisim",
                "image": "",
            },
            "solutions": [
                {"id": "ep", "name": "EP", "desc": "Yerel işletmeler için pazaryeri operasyonu: ürün, stok, fiyat ve sipariş yönetimi tek merkezden.", "cta": "EP'yi Keşfet", "link": "/ep", "logo": "", "visible": True},
                {"id": "epapp", "name": "EPapp", "desc": "Çok şubeli işletmeler için pazaryeri entegrasyonları, personel uygulaması ve markaya özel sipariş altyapısı.", "cta": "EPapp'i Keşfet", "link": "/epapp", "logo": "", "visible": True},
                {"id": "epfood", "name": "EPfood", "desc": "Restoranlar için dijital satış: panel kurulumu, menü, opsiyonlar ve tek ekran sipariş yönetimi.", "cta": "EPfood'u Keşfet", "link": "/epfood", "logo": "", "visible": True},
                {"id": "epgo", "name": "EPgo", "desc": "Hemen teslim, randevulu teslim, moto kurye ve frigolu panelvan çözümleri.", "cta": "EPgo'yu Keşfet", "link": "/epgo", "logo": "", "visible": True},
            ],
            "metrics": [
                {"value": "100K+", "label": "Yönetilen Ürün", "active": True},
                {"value": "70+", "label": "Firma Epersonel'de", "active": True},
                {"value": "150+", "label": "Şube / Panel", "active": True},
                {"value": "15K+", "label": "Yönetilen Sipariş", "active": True},
            ],
            "finalCta": {
                "eyebrow": "Nereden başlayacağınızdan emin değil misiniz?",
                "title": "İhtiyacınızı anlatın, doğru çözümü birlikte bulalım.",
                "desc": "İşletmenizin yapısını dinliyor, satış kanallarınızı ve operasyonunuzu analiz ediyor, size en uygun teknoloji + operasyon modelini birlikte belirliyoruz.",
                "cta1Text": "Görüşme Planla",
                "cta1Link": "/iletisim",
                "cta2Text": "Bize Ulaşın",
                "cta2Link": "/iletisim",
            },
        },
    },
    "steps": {
        "label": "Ana Sayfa — 4 Adım",
        "defaults": {
            "eyebrow": "NASIL ÇALIŞIR",
            "title": "4 adımda işletmenizi e-ticarete taşıyın.",
            "desc": "Pazaryeri entegrasyonundan markanıza özel sipariş kanalına, personel operasyonundan teslimata kadar tüm süreci tek sistemde yönetin.",
            "flow": "Entegre et → Sipariş al → Hazırla → Teslim et",
            "items": [
                {"short": "Entegre et", "title": "Pazaryerleri stok & fiyat entegrasyonu", "desc": "Ürünleriniz desteklenen pazaryerlerine bağlanır; stok ve fiyat tek merkezden canlı yönetilir.", "features": ["Ürün & barkod eşleme", "Canlı stok senkronu", "Merkezi fiyat yönetimi", "Pazaryeri bağlantıları"], "image": "", "visible": True},
                {"short": "Sipariş al", "title": "Web & mobil firmaya özel sipariş uygulaması", "desc": "Markanıza özel mobil uygulama ve web sipariş ekranı ile komisyonsuz kendi kanalınızdan sipariş alın.", "features": ["Markanıza özel mobil uygulama", "Web sipariş ekranı", "Kampanya & banner alanları", "Sepet ve online ödeme akışı"], "image": "", "visible": True},
                {"short": "Hazırla", "title": "Personel sipariş hazırlama uygulaması ve admin panel", "desc": "Gelen sipariş personelin ekranına düşer; tüm operasyon admin panelinden anlık kontrol edilir.", "features": ["Sipariş hazırlama ekranı", "Personel uygulaması", "Admin panel kontrolü", "Anlık sipariş durumu"], "image": "", "visible": True},
                {"short": "Teslim et", "title": "Kurye teslimatı — siparişin müşteriye ulaşması", "desc": "Hazır sipariş kuryeye aktarılır; rota ve teslimat müşteriye kadar canlı takip edilir.", "features": ["Mağazadan kuryeye aktarım", "Rota & canlı takip", "Müşteriye teslim"], "image": "", "visible": True},
            ],
        },
    },
    "page_ep": {
        "label": "Çözüm — EP",
        "defaults": {
            "hero": {"eyebrow": "Yerel İşletmeler İçin", "title1": "Pazaryerlerinde satışa başlayın.", "title2": "Operasyonu bize bırakın.", "desc": "İşletmenizi desteklenen pazaryerlerinde satışa açıyor, ürünlerinizi hazırlıyor, stok ve fiyat süreçlerinizi yönetiyor ve size kendi EP uygulamanızı sunuyoruz.", "cta1Text": "Hemen Başla", "cta1Link": "#basvuru", "cta2Text": "Görüşme Planla", "cta2Link": "/iletisim", "image": ""},
            "platforms": ["Trendyol", "Yemeksepeti", "Getir", "Migros Hemen"],
            "sectors": [
                {"name": "Market", "active": True},
                {"name": "Kasap", "active": True},
                {"name": "Manav", "active": True},
                {"name": "Şarküteri", "active": True},
                {"name": "Petshop", "active": True},
                {"name": "Su Bayii", "active": True},
            ],
            "packages": [
                {"name": "EP Başlangıç", "price": "1.990", "kdv": "+ KDV / ay", "badge": "", "features": ["1 platform", "500 ürüne kadar", "Mağaza açılışı", "İlk ürün yükleme", "EP uygulaması", "Temel destek"], "recommended": False, "active": True},
                {"name": "EP Plus", "price": "3.999", "kdv": "+ KDV / ay", "badge": "En Çok Tercih Edilen", "features": ["3 platform", "2.000 ürüne kadar", "Mağaza açılışı", "İlk ürün yükleme", "EP uygulaması", "Stok & fiyat yönetimi", "Öncelikli destek"], "recommended": True, "active": True},
                {"name": "EP Pro", "price": "6.999", "kdv": "+ KDV / ay", "badge": "", "features": ["Tüm desteklenen platformlar", "5.000 ürüne kadar", "Mağaza açılışı", "İlk ürün yükleme", "EP uygulaması", "Gelişmiş raporlama", "Öncelikli destek"], "recommended": False, "active": True},
            ],
        },
    },
    "page_epapp": {
        "label": "Çözüm — EPapp",
        "defaults": {
            "hero": {"eyebrow": "Çok Şubeli İşletmeler", "title1": "Tüm dijital satış kanallarınız.", "title2": "Tek altyapı.", "desc": "Pazaryeri entegrasyonları, personel sipariş uygulaması, merkezi yönetim paneli ve markanıza özel mobil & web sipariş sistemi.", "cta1Text": "Görüşme Planla", "cta1Link": "/iletisim", "cta2Text": "Teklif Talep Et", "cta2Link": "#teklif", "image": ""},
            "areas": [
                {"key": "entegrasyon", "title": "Pazaryeri Entegrasyonları", "desc": "Desteklenen tüm pazaryerleri tek altyapıya bağlanır; sipariş, ürün ve stok akışı merkezileşir.", "image": "", "cta": "", "visible": True},
                {"key": "marka", "title": "Pazaryerlerinde satış yapın. Kendi sipariş kanalınızı da büyütün.", "desc": "Markanıza özel iOS ve Android uygulaması ile web sipariş kanalını kuruyoruz. Tüm siparişler EPapp merkezi yönetimine akar; müşteri verisi sizde kalır.", "image": "/assets/epapp-brand-channel.png", "cta": "Teklif Talep Et", "visible": True},
                {"key": "personel", "title": "Personel Uygulaması", "desc": "Personeliniz 5 panel değil, tek uygulama kullansın. Trendyol, Yemeksepeti, Getir ve kendi uygulamanızdan gelen siparişler tek ekranda.", "image": "/assets/eorder-personel.png", "cta": "", "visible": True},
                {"key": "admin", "title": "Admin Panel", "desc": "Sipariş, ciro, personel, geciken sipariş, ürün ve mağaza yönetimi. Tüm raporlar tek panelde.", "image": "/assets/eorder-admin.png", "cta": "", "visible": True},
                {"key": "subeler", "title": "Bir şubeden yüzlerce şubeye.", "desc": "Çoklu şube yapısı merkezi yönetim ekranından izlenir; her şubenin performansı anlık takip edilir.", "image": "/assets/eorder-dashboard.png", "cta": "", "visible": True},
            ],
        },
    },
    "page_epfood": {
        "label": "Çözüm — EPfood",
        "defaults": {
            "hero": {"eyebrow": "Restoran & Yeme-İçme", "title1": "Restoranınızı dijital siparişe hazırlayın.", "title2": "", "desc": "Panel kurulumu, menü yapısı, ürün seçenekleri, görseller, sipariş yönetimi ve teslimat çözümleri.", "cta1Text": "Restoranınız İçin Teklif Al", "cta1Link": "#teklif", "cta2Text": "Görüşme Planla", "cta2Link": "/iletisim", "image": ""},
            "areas": [
                {"key": "panel", "title": "Panel Kurulumu", "desc": "Restoranınızı desteklenen yemek platformlarında satışa hazır hale getiriyoruz: mağaza açılışı, komisyon ve operasyon ayarları.", "image": "", "visible": True},
                {"key": "menu", "title": "Menü Çalışması", "desc": "Kategoriler, ürünler, menüler ve combo yapıları satışa dönük şekilde kurgulanır.", "image": "", "visible": True},
                {"key": "opsiyon", "title": "Opsiyon & Ekstralar", "desc": "Her ürün için pişirme tercihi, ekstra malzeme ve ücretli eklentiler tanımlanır; müşteri seçimi siparişe net yansır.", "image": "", "visible": True},
                {"key": "gorsel", "title": "Ürün Görselleri", "desc": "Ürünlerinizi yalnızca yüklemiyoruz. Satışa hazırlıyoruz.", "image": "", "visible": True},
                {"key": "tekekran", "title": "4 tablet yerine tek ekran.", "desc": "Trendyol Yemek, Yemeksepeti, GetirYemek ve diğer desteklenen platformlardan gelen tüm siparişler tek EPfood sipariş ekranında birleşir.", "image": "", "visible": True},
            ],
        },
    },
    "page_epgo": {
        "label": "Çözüm — EPgo",
        "defaults": {
            "hero": {"eyebrow": "Teslimat Operasyonu", "title1": "Sipariş hazır.", "title2": "Gerisini EPgo'ya bırakın.", "desc": "Hemen teslim, randevulu teslim, moto kurye ve işletmeye özel frigolu panelvan çözümleri.", "cta1Text": "Teslimat Teklifi Al", "cta1Link": "#teklif", "cta2Text": "Operasyonu Görüşelim", "cta2Link": "/iletisim", "image": ""},
            "areas": [
                {"key": "hemen", "title": "30–45 Dakika Hemen Teslim", "desc": "Sipariş hazır olduğunda kurye yola çıkar; müşteriniz dakikalar içinde teslim alır.", "image": "", "visible": True},
                {"key": "randevulu", "title": "Randevulu Teslim", "desc": "Müşterinizin seçtiği zaman aralığında, planlı ve öngörülebilir teslimat.", "image": "", "visible": True},
                {"key": "moto", "title": "Moto Kurye", "desc": "Şehir içi hızlı teslimat için moto kurye ağı; her sipariş adım adım izlenir.", "image": "", "visible": True},
                {"key": "frigolu", "title": "İşletmeye Özel Frigolu Panelvan", "desc": "Motorla hızlı teslim. Frigolu araçla kontrollü teslim. Soğuk zincir gerektiren ürünleriniz için size özel araç ve rota planlaması.", "image": "/assets/epgo-kurye.png", "cta": "Teslimat Teklifi Al", "visible": True},
            ],
        },
    },
    "about": {
        "label": "Hakkımızda",
        "defaults": {
            "eyebrow": "Hakkımızda",
            "line1": "Teknoloji kuruyoruz.",
            "line2": "Operasyonu birlikte yürütüyoruz.",
            "p1": "Epersonel; işletmelerin dijital satış kanallarını kuran, birbirine bağlayan, sipariş operasyonlarını yöneten ve gerektiğinde teslimatı da üstlenen bir teknoloji + operasyon şirketidir.",
            "p2": "Perakende, restoran ve teslimat gibi birbirinden farklı ihtiyaçlara aynı sistem disipliniyle çözüm üretiriz: pazaryeri entegrasyonları, stok ve fiyat akışları, personel ve yönetim uygulamaları, teslimat koordinasyonu.",
            "p3": "Tek seferlik yazılım teslim edip çekilen bir tedarikçi değil; operasyonun içinde kalan bir çözüm ortağıyız. Sistem kurulduktan sonra da izler, iyileştirir ve işletmeyle birlikte geliştiririz.",
            "model": [
                {"n": "01", "title": "Analiz ve Planlama", "desc": "İşletmenizin yapısını, kanallarını ve hedeflerini analiz eder; size uygun modeli birlikte planlarız."},
                {"n": "02", "title": "Kurulum ve Entegrasyon", "desc": "Mağaza açılışları, entegrasyonlar, ürün ve menü kurulumları tarafımızca tamamlanır."},
                {"n": "03", "title": "Eğitim ve Devreye Alma", "desc": "Ekibinizi uygulamalarla eğitir, operasyonu birlikte devreye alırız."},
                {"n": "04", "title": "Takip ve Geliştirme", "desc": "Sistem ve operasyon süreçlerini sürekli izler, iyileştirir ve geliştiririz."},
            ],
            "ctaTitle": "Müşterimiz olmanıza gerek yok, tanışalım.",
            "ctaDesc": "Bir satış görüşmesi değil; işletmenizi dinlediğimiz, ihtiyacınızı birlikte netleştirdiğimiz samimi bir tanışma.",
            "ctaText": "Tanışalım",
            "ctaLink": "/iletisim",
        },
    },
    "contact": {
        "label": "İletişim",
        "defaults": {
            "title": "İşletmenizi konuşalım.",
            "desc": "İhtiyacınızı anlatın; aynı gün dönüş yapalım.",
            "formTitle": "",
            "formDesc": "",
            "phone": "+90 (212) 000 00 00",
            "phoneTel": "+902120000000",
            "email": "info@epersonelapp.com",
            "instagram": "https://www.instagram.com/epersonel",
            "linkedin": "https://www.linkedin.com/company/epersonel",
        },
    },
    "footer": {
        "label": "Footer",
        "defaults": {
            "desc": "Dijital satış kanallarını kuran, sipariş operasyonunu yöneten ve teslimatı üstlenen teknoloji + operasyon şirketi.",
            "copyright": "© 2026 Epersonel. Tüm hakları saklıdır.",
        },
    },
    "seo": {
        "label": "SEO / Ayarlar",
        "defaults": {
            "global": {"siteName": "Epersonel", "domain": "", "defaultOgImage": "/og-image.png", "phone": "+90 (212) 000 00 00", "email": "info@epersonelapp.com", "instagram": "https://www.instagram.com/epersonel", "linkedin": "https://www.linkedin.com/company/epersonel"},
            "pages": {
                "home": {"title": "Epersonel — Dijital Satış ve Operasyon Çözümleri", "description": "Pazaryerlerinden kendi sipariş kanalınıza, sipariş yönetiminden teslimata kadar işletmenizin ihtiyacına uygun teknoloji ve operasyon çözümleri.", "ogTitle": "", "ogDescription": "", "ogImage": "", "canonical": "", "noindex": False},
                "ep": {"title": "EP — Yerel İşletmeler İçin Pazaryeri Operasyonu | Epersonel", "description": "", "ogTitle": "", "ogDescription": "", "ogImage": "", "canonical": "", "noindex": False},
                "epapp": {"title": "EPapp — Çok Şubeli İşletmeler İçin Dijital Satış Altyapısı | Epersonel", "description": "", "ogTitle": "", "ogDescription": "", "ogImage": "", "canonical": "", "noindex": False},
                "epfood": {"title": "EPfood — Restoranlar İçin Dijital Satış | Epersonel", "description": "", "ogTitle": "", "ogDescription": "", "ogImage": "", "canonical": "", "noindex": False},
                "epgo": {"title": "EPgo — Teslimat ve Kurye Operasyonu | Epersonel", "description": "30–45 dakika hemen teslim, randevulu teslim, moto kurye ve işletmeye özel frigolu panelvan çözümleri.", "ogTitle": "", "ogDescription": "", "ogImage": "", "canonical": "", "noindex": False},
                "referanslar": {"title": "Referanslar | Epersonel", "description": "", "ogTitle": "", "ogDescription": "", "ogImage": "", "canonical": "", "noindex": False},
                "hakkimizda": {"title": "Hakkımızda | Epersonel", "description": "", "ogTitle": "", "ogDescription": "", "ogImage": "", "canonical": "", "noindex": False},
                "iletisim": {"title": "İletişim | Epersonel", "description": "", "ogTitle": "", "ogDescription": "", "ogImage": "", "canonical": "", "noindex": False},
            },
        },
    },
}

MEDIA_CATEGORIES = ["Logolar", "Favicon", "Ana Sayfa", "EP", "EPapp", "EPfood", "EPgo", "Referanslar", "OG / Sosyal Paylaşım"]
ALLOWED_MEDIA = {"image/png", "image/jpeg", "image/webp", "image/svg+xml"}


async def seed_content():
    """İçerik anahtarları yoksa varsayılanlarla oluştur (yayınlanmış olarak)."""
    for key, spec in CONTENT_DEFS.items():
        existing = await _db.site_content.find_one({"key": key})
        if not existing:
            await _db.site_content.insert_one({
                "key": key,
                "label": spec["label"],
                "data": spec["defaults"],
                "draft": None,
                "has_draft": False,
                "updated_at": _now(),
                "updated_by": "seed",
            })


def _doc_out(doc: dict) -> dict:
    return {
        "key": doc["key"],
        "label": doc.get("label", doc["key"]),
        "data": doc.get("data") or {},
        "draft": doc.get("draft"),
        "has_draft": bool(doc.get("has_draft")),
        "updated_at": doc.get("updated_at"),
        "updated_by": doc.get("updated_by"),
    }


class ContentUpdate(BaseModel):
    data: dict
    publish: bool = False


# ---------------------------------------------------------------- public
@router.get("/content")
async def public_content():
    """Yalnızca yayınlanmış içerikler — public sitenin veri kaynağı."""
    out = {}
    async for doc in _db.site_content.find({}, {"key": 1, "data": 1}):
        out[doc["key"]] = doc.get("data") or {}
    return out


@router.get("/media/{media_id}")
async def serve_media(media_id: str):
    doc = await _db.media.find_one({"id": media_id})
    if not doc:
        raise HTTPException(404, "Görsel bulunamadı")
    content, ctype = _get_object(doc["storage_path"])
    return RawResponse(content=content, media_type=ctype)


# ---------------------------------------------------------------- admin: içerik
@router.get("/admin/content")
async def admin_content_list(user: dict = Depends(_admin)):
    items = []
    async for doc in _db.site_content.find({}):
        items.append(_doc_out(doc))
    return {"items": items}


@router.put("/admin/content/{key}")
async def admin_content_update(key: str, body: ContentUpdate, user: dict = Depends(_admin)):
    doc = await _db.site_content.find_one({"key": key})
    if not doc:
        raise HTTPException(404, "İçerik anahtarı bulunamadı")
    if body.publish:
        update = {"data": body.data, "draft": None, "has_draft": False}
    else:
        update = {"draft": body.data, "has_draft": True}
    update["updated_at"] = _now()
    await _db.site_content.update_one({"key": key}, {"$set": update})
    return await _db.site_content.find_one({"key": key}, {"_id": 0})


@router.post("/admin/content/{key}/publish")
async def admin_content_publish(key: str, user: dict = Depends(_admin)):
    doc = await _db.site_content.find_one({"key": key})
    if not doc:
        raise HTTPException(404, "İçerik anahtarı bulunamadı")
    if not doc.get("has_draft") or doc.get("draft") is None:
        raise HTTPException(400, "Yayınlanacak taslak yok")
    await _db.site_content.update_one(
        {"key": key},
        {"$set": {"data": doc["draft"], "draft": None, "has_draft": False, "updated_at": _now()}},
    )
    return {"ok": True}


@router.get("/admin/stats")
async def admin_stats(user: dict = Depends(_admin)):
    total_refs = await _db.references.count_documents({})
    active_refs = await _db.references.count_documents({"active": True})
    media_count = await _db.media.count_documents({})
    last_content = await _db.site_content.find_one({}, sort=[("updated_at", -1)])
    recent_edits = []
    async for d in _db.site_content.find({}, {"key": 1, "label": 1, "updated_at": 1, "has_draft": 1}).sort("updated_at", -1).limit(5):
        recent_edits.append({"key": d["key"], "label": d.get("label", d["key"]), "updated_at": d.get("updated_at"), "has_draft": bool(d.get("has_draft"))})
    recent_refs = []
    async for r in _db.references.find({}, {"name": 1, "active": 1, "solutions": 1}).sort("_id", -1).limit(5):
        recent_refs.append({"id": str(r["_id"]), "name": r.get("name"), "active": r.get("active"), "solutions": r.get("solutions", [])})
    return {
        "total_refs": total_refs,
        "active_refs": active_refs,
        "media_count": media_count,
        "last_update": (last_content or {}).get("updated_at"),
        "recent_edits": recent_edits,
        "recent_refs": recent_refs,
    }


# ---------------------------------------------------------------- admin: medya
@router.get("/admin/media")
async def media_list(category: Optional[str] = None, user: dict = Depends(_admin)):
    q = {"category": category} if category else {}
    items = []
    async for d in _db.media.find(q).sort("created_at", -1):
        items.append({
            "id": d["id"],
            "name": d.get("name"),
            "category": d.get("category"),
            "url": f"/api/media/{d['id']}",
            "size": d.get("size"),
            "created_at": d.get("created_at"),
        })
    return {"items": items}


@router.post("/admin/media", status_code=201)
async def media_upload(file: UploadFile = File(...), name: str = Form(""), category: str = Form("Ana Sayfa"), user: dict = Depends(_admin)):
    if file.content_type not in ALLOWED_MEDIA:
        raise HTTPException(400, "Desteklenmeyen dosya tipi (PNG, JPG, WEBP, SVG)")
    raw = await file.read()
    if len(raw) > 5 * 1024 * 1024:
        raise HTTPException(400, "Dosya 5 MB sınırını aşıyor")
    safe = re.sub(r"[^a-zA-Z0-9._-]", "_", file.filename or "gorsel")
    path = f"media/{uuid.uuid4().hex}_{safe}"
    _put_object(path, raw, file.content_type)
    mid = uuid.uuid4().hex[:12]
    doc = {
        "id": mid,
        "name": name or file.filename or "gorsel",
        "category": category if category in MEDIA_CATEGORIES else "Ana Sayfa",
        "storage_path": path,
        "size": len(raw),
        "created_at": _now(),
    }
    await _db.media.insert_one(doc)
    return {"id": mid, "name": doc["name"], "category": doc["category"], "url": f"/api/media/{mid}", "size": len(raw), "created_at": doc["created_at"]}


class MediaUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None


@router.patch("/admin/media/{media_id}")
async def media_update(media_id: str, body: MediaUpdate, user: dict = Depends(_admin)):
    update = {k: v for k, v in body.model_dump().items() if v is not None}
    if "category" in update and update["category"] not in MEDIA_CATEGORIES:
        raise HTTPException(400, "Geçersiz kategori")
    res = await _db.media.update_one({"id": media_id}, {"$set": update})
    if res.matched_count == 0:
        raise HTTPException(404, "Görsel bulunamadı")
    return {"ok": True}


@router.delete("/admin/media/{media_id}")
async def media_delete(media_id: str, user: dict = Depends(_admin)):
    res = await _db.media.delete_one({"id": media_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Görsel bulunamadı")
    return {"ok": True}
