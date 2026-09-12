from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import uuid
from pathlib import Path
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

BRANCH_OPTIONS = {"1 Şube", "2–5", "6–20", "21–50", "51–100", "100+"}
SOLUTIONS = {"ep", "epapp", "epkurye", "epfood"}
FORM_TYPES = {"gorusme", "teklif", "iletisim", "teslimat", "basvuru"}


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
    # ENTEGRASYON NOKTASI: CRM / e-posta bildirimi buraya bağlanacak.
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
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
