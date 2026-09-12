from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import uuid
import ipaddress
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
import httpx
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

BRANCH_OPTIONS = {"1 Şube", "2–5 Şube", "6–20 Şube", "21–50 Şube", "51–100 Şube", "100+ Şube"}
SOLUTIONS = {"ep", "epapp", "epkurye", "epfood"}
SOLUTION_LABELS = {"ep": "EP", "epapp": "EPapp", "epkurye": "EPkurye", "epfood": "EPfood"}
FORM_TYPES = {"gorusme", "teklif", "iletisim", "teslimat", "basvuru"}

# Emergent managed e-posta (Resend) — EMAIL_BASE_URL sabittir, env'den okunmaz.
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Epersonel")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
LEAD_NOTIFICATION_EMAIL = os.environ.get("LEAD_NOTIFICATION_EMAIL")


# --- E-posta guardrail gate (G2/G3 yapısal kontroller) ---
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def _email_shell(title: str, inner: str) -> str:
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F7F6;padding:32px 0">'
        '<tr><td align="center">'
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif">'
        '<tr><td style="background:#42FF00;height:6px;font-size:0;line-height:0">&nbsp;</td></tr>'
        '<tr><td style="padding:28px 40px 0"><span style="font-size:20px;font-weight:800;color:#101110;letter-spacing:-0.5px">epersonel</span></td></tr>'
        f'<tr><td style="padding:20px 40px 0"><p style="margin:0;font-size:22px;font-weight:700;color:#101110">{escape(title)}</p></td></tr>'
        f'<tr><td style="padding:16px 40px 32px">{inner}</td></tr>'
        '<tr><td style="padding:20px 40px;border-top:1px solid #E7E9E7">'
        '<p style="margin:0;font-size:12px;color:#656A65">Epersonel — Dijital Satış ve Operasyon Çözümleri</p>'
        '</td></tr></table></td></tr></table>'
    )


def _row(label: str, value: Optional[str]) -> str:
    if not value:
        return ""
    return (
        f'<tr><td style="padding:8px 0;font-size:13px;color:#656A65;width:170px;vertical-align:top">{escape(label)}</td>'
        f'<td style="padding:8px 0;font-size:14px;font-weight:600;color:#101110">{escape(value)}</td></tr>'
    )


def _team_notification_html(doc: dict) -> str:
    rows = "".join([
        _row("İşletme Adı", doc["business_name"]),
        _row("Şube Sayısı", doc["branch_count"]),
        _row("Yetkili Kişi", doc["contact_name"]),
        _row("E-posta", doc["email"]),
        _row("Telefon", doc["phone"]),
        _row("İlgilendiği Çözüm", SOLUTION_LABELS.get(doc.get("solution") or "", doc.get("solution") or "Belirtilmedi")),
        _row("Teslimat İhtiyacı", doc.get("delivery_type")),
        _row("Günlük Tahmini Sipariş", doc.get("daily_orders")),
        _row("Görüşme Türü", doc.get("meeting_type")),
        _row("Mesaj / İhtiyaç", doc.get("message")),
        _row("Sayfa", doc.get("source_page")),
        _row("Tarih", doc["created_at"]),
    ])
    inner = f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0">{rows}</table>'
    return _email_shell(f"Yeni Talep: {doc['business_name']}", inner)


def _user_confirmation_html(contact_name: str) -> str:
    first = escape(contact_name.strip())
    inner = (
        f'<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#101110">Merhaba {first},</p>'
        '<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#101110">Talebiniz tarafımıza ulaştı.</p>'
        '<p style="margin:0;font-size:15px;line-height:1.6;color:#101110">Ekibimiz işletmenizin ihtiyacını inceleyerek '
        'en kısa sürede sizinle iletişime geçecektir.</p>'
    )
    return _email_shell("Talebinizi Aldık", inner)


class LeadCreate(BaseModel):
    business_name: str = Field(min_length=2, max_length=140)
    branch_count: str
    contact_name: str = Field(min_length=3, max_length=140)
    email: EmailStr
    phone: str
    solution: Optional[str] = None
    meeting_type: Optional[str] = None
    delivery_type: Optional[str] = None
    daily_orders: Optional[str] = None
    message: Optional[str] = Field(default=None, max_length=2000)
    form_type: str = "gorusme"
    source_page: Optional[str] = None
    kvkk: bool

    @field_validator("branch_count")
    @classmethod
    def check_branch(cls, v: str) -> str:
        if v not in BRANCH_OPTIONS:
            raise ValueError("Geçersiz şube sayısı")
        return v

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v: str) -> str:
        digits = re.sub(r"\D", "", v)
        if not re.fullmatch(r"0?[2-5]\d{9}", digits):
            raise ValueError("Geçersiz telefon numarası")
        return digits

    @field_validator("solution")
    @classmethod
    def check_solution(cls, v: Optional[str]) -> Optional[str]:
        if v and v not in SOLUTIONS:
            raise ValueError("Geçersiz çözüm")
        return v

    @field_validator("form_type")
    @classmethod
    def check_form_type(cls, v: str) -> str:
        if v not in FORM_TYPES:
            raise ValueError("Geçersiz form tipi")
        return v

    @field_validator("kvkk")
    @classmethod
    def check_kvkk(cls, v: bool) -> bool:
        if not v:
            raise ValueError("KVKK onayı zorunludur")
        return v


@api_router.get("/")
async def root():
    return {"message": "Epersonel API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/leads", status_code=201)
async def create_lead(payload: LeadCreate):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["status"] = "new"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.leads.insert_one(doc)

    # E-posta akışları best-effort: e-posta hatası form gönderimini engellemez.
    if EMAIL_KEY:
        try:
            if LEAD_NOTIFICATION_EMAIL:
                await send_email(
                    to=LEAD_NOTIFICATION_EMAIL,
                    subject=f"Yeni Talep: {doc['business_name']} | Epersonel",
                    html=_team_notification_html(doc),
                    reply_to=doc["email"],
                )
        except Exception:
            logger.exception("Ekip bildirim e-postası gönderilemedi")
        try:
            await send_email(
                to=doc["email"],
                subject="Talebinizi Aldık | Epersonel",
                html=_user_confirmation_html(doc["contact_name"]),
            )
        except Exception:
            logger.exception("Kullanıcı onay e-postası gönderilemedi")
    else:
        logger.warning("EMERGENT_EMAIL_KEY tanımlı değil; e-posta gönderimi atlandı")

    return {"ok": True, "message": "Talebiniz alındı."}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
