"""Backend API tests for Epersonel site."""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://digital-sales-hub-65.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@epersonelapp.com"
ADMIN_PASSWORD = "Epersonel2026*Panel"


@pytest.fixture(scope="session")
def s():
    return requests.Session()


@pytest.fixture(scope="session")
def admin_session():
    ses = requests.Session()
    r = ses.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"Admin login failed: {r.status_code} {r.text}"
    data = r.json()
    token = data.get("access_token")
    if token:
        ses.headers.update({"Authorization": f"Bearer {token}"})
    return ses


# --- Health ---
def test_health(s):
    r = s.get(f"{API}/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


# --- Auth ---
class TestAuth:
    def test_login_success(self):
        r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        data = r.json()
        assert "access_token" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"
        # Verify httpOnly cookie set
        assert any(c.name == "access_token" for c in r.cookies)

    def test_login_wrong_password(self):
        r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-password-xyz"})
        assert r.status_code == 401

    def test_me_requires_auth(self):
        r = requests.get(f"{API}/auth/me")
        assert r.status_code in (401, 403)

    def test_me_with_token(self, admin_session):
        r = admin_session.get(f"{API}/auth/me")
        assert r.status_code == 200


# --- Leads ---
class TestLeads:
    lead_id = None

    def test_create_lead_success(self, s):
        payload = {
            "business_name": "TEST_QA Market",
            "branch_count": "2–5 Şube",
            "contact_name": "Test Kullanıcı",
            "email": "delivered@resend.dev",
            "phone": "05321234567",
            "il": "İstanbul",
            "ilce": "Kadıköy",
            "solution": "ep",
            "form_type": "iletisim",
            "source_page": "/iletisim",
            "kvkk": True,
        }
        r = s.post(f"{API}/leads", json=payload)
        assert r.status_code == 201, r.text
        assert r.json().get("ok") is True

    def test_create_lead_missing_kvkk(self, s):
        payload = {
            "business_name": "TEST QA",
            "branch_count": "2–5 Şube",
            "contact_name": "Test User",
            "email": "delivered@resend.dev",
            "phone": "05321234567",
            "il": "İstanbul",
            "ilce": "Kadıköy",
            "form_type": "iletisim",
            "kvkk": False,
        }
        r = s.post(f"{API}/leads", json=payload)
        assert r.status_code in (400, 422)

    def test_create_lead_invalid_phone(self, s):
        payload = {
            "business_name": "TEST QA",
            "branch_count": "2–5 Şube",
            "contact_name": "Test User",
            "email": "delivered@resend.dev",
            "phone": "12345",
            "il": "İstanbul",
            "ilce": "Kadıköy",
            "form_type": "iletisim",
            "kvkk": True,
        }
        r = s.post(f"{API}/leads", json=payload)
        assert r.status_code in (400, 422)

    def test_list_leads_requires_auth(self):
        r = requests.get(f"{API}/admin/leads")
        assert r.status_code in (401, 403)

    def test_list_leads_and_find_qa(self, admin_session):
        r = admin_session.get(f"{API}/admin/leads", params={"q": "TEST_QA Market", "page_size": 25})
        assert r.status_code == 200, r.text
        data = r.json()
        assert "items" in data and "kpis" in data
        items = data["items"]
        assert any(it.get("business_name") == "TEST_QA Market" for it in items), "Test lead not found in list"
        # Store first matching lead id for further tests
        TestLeads.lead_id = next((it["id"] for it in items if it.get("business_name") == "TEST_QA Market"), None)
        assert TestLeads.lead_id
        # verify no mongo _id leak
        for it in items:
            assert "_id" not in it

    def test_update_lead_status(self, admin_session):
        assert TestLeads.lead_id, "prerequisite test failed"
        r = admin_session.patch(f"{API}/admin/leads/{TestLeads.lead_id}", json={"status": "contacted"})
        assert r.status_code == 200, r.text
        # verify persisted
        r2 = admin_session.get(f"{API}/admin/leads", params={"q": "TEST_QA Market"})
        item = next(it for it in r2.json()["items"] if it["id"] == TestLeads.lead_id)
        assert item["status"] == "contacted"

    def test_update_lead_invalid_status(self, admin_session):
        assert TestLeads.lead_id
        r = admin_session.patch(f"{API}/admin/leads/{TestLeads.lead_id}", json={"status": "not-a-status"})
        assert r.status_code in (400, 422)

    def test_assign_lead_unassigned(self, admin_session):
        assert TestLeads.lead_id
        r = admin_session.patch(f"{API}/admin/leads/{TestLeads.lead_id}/assign", json={"member_id": None})
        assert r.status_code == 200


# --- References ---
class TestReferences:
    ref_id = None

    def test_public_references_list(self, s):
        r = s.get(f"{API}/references")
        assert r.status_code == 200
        data = r.json()
        assert "items" in data
        assert isinstance(data["items"], list)
        for it in data["items"]:
            assert "_id" not in it
            assert "name" in it

    def test_admin_references_requires_auth(self):
        r = requests.get(f"{API}/admin/references")
        assert r.status_code in (401, 403)

    def test_admin_create_reference(self, admin_session):
        payload = {
            "name": f"TEST_Ref_{uuid.uuid4().hex[:6]}",
            "solutions": ["ep"],
            "services": ["Test Service"],
            "order": 999,
            "active": True,
            "show_marquee": False,
            "show_ep": False,
            "show_epapp": False,
            "show_epfood": False,
            "show_epgo": False,
            "show_references": True,
        }
        r = admin_session.post(f"{API}/admin/references", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert "id" in data
        TestReferences.ref_id = data["id"]

    def test_admin_update_reference(self, admin_session):
        assert TestReferences.ref_id
        payload = {
            "name": f"TEST_Ref_updated_{uuid.uuid4().hex[:4]}",
            "solutions": ["ep"],
            "services": ["Updated"],
            "order": 999,
            "active": False,
            "show_marquee": False,
            "show_ep": False,
            "show_epapp": False,
            "show_epfood": False,
            "show_epgo": False,
            "show_references": True,
        }
        r = admin_session.patch(f"{API}/admin/references/{TestReferences.ref_id}", json=payload)
        assert r.status_code == 200, r.text


# --- Non-existent routes referenced in review (verify presence/absence) ---
def test_locations_cities_route_absent():
    """Review asked about /api/locations/cities but LeadForm uses local JSON. Route should be absent (informational)."""
    r = requests.get(f"{API}/locations/cities")
    # Just document the state
    assert r.status_code in (404, 405)
