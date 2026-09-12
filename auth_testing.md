# Auth Testing Playbook — Epersonel Talep Paneli

## Ortam
- Backend: {REACT_APP_BACKEND_URL}/api
- Admin giriş: /admin (public değil; JWT korumalı)

## Test Credentials
- Admin: admin@epersonelapp.com / Epersonel2026*Panel (test ortamı — /app/memory/test_credentials.md ile aynı)

## Adım 1: MongoDB doğrulama
mongosh → use test_database
- db.users.find({role:"admin"}) → admin kaydı var
- password_hash "$2b$" ile başlıyor
- Indexler: users.email (unique), login_attempts.identifier

## Adım 2: API testi
```
TOKEN=$(curl -s -X POST $API/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"admin@epersonelapp.com","password":"Epersonel2026*Panel"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['access_token'])")
curl -s $API/api/auth/me -H "Authorization: Bearer $TOKEN"          # 200 + user
curl -s $API/api/admin/leads -H "Authorization: Bearer $TOKEN"      # 200 + items + kpis
curl -s $API/api/admin/leads                                        # 401 beklenir
curl -s -X PATCH $API/api/admin/leads/<lead_id> -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" -d '{"status":"contacted"}'   # {"ok":true}
curl -s -X POST $API/api/admin/leads/<lead_id>/notes -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" -d '{"text":"Arandı, yarın dönecek"}'  # note objesi
```
Yanlış şifre: 401. 5 hatalı deneme: 429 (15 dk kilit).

## Adım 3: UI testi
/admin → login formu → giriş → KPI kartları + filtreler + talep listesi → satıra tıkla → durum değiştir, not ekle, Ara/WhatsApp/E-posta aksiyonları.
