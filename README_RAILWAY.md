# Railway deploy

This project is configured as a single Railway service:

- React/Vite is built inside the Docker image.
- Django serves the built React app and `/plat/` REST API from the same domain.
- Gunicorn is the production web server.
- WhiteNoise serves Vite/Django static assets.
- Database migrations run automatically on container startup.

## Railway

Deploy the repository with the project root set to the folder containing `manage.py` and `Dockerfile`.

Recommended variables:

- `SECRET_KEY` — a long random production secret.
- `DEBUG=0`
- `ALLOWED_HOSTS=*` (or your Railway domain)
- `CSRF_TRUSTED_ORIGINS=https://YOUR-RAILWAY-DOMAIN`

No separate frontend service is required.

## Ma'lumotlar yo'qolmasligi uchun (muhim)

Railway'da konteyner fayl tizimi har deploydan keyin tozalanadi. SQLite bazasini saqlab qolish uchun:

1. Railway → servis → **Settings → Volumes → Add Volume**, mount path: `/data`
2. **Variables** ga qo'shing: `SQLITE_PATH=/data/db.sqlite3`
3. Birinchi ishga tushishda loyihadagi `db.sqlite3` (admin va mavjud foydalanuvchilar bilan) avtomatik `/data` ga ko'chiriladi.

Qo'shimcha variables: `SECRET_KEY` (uzun tasodifiy qator), `DEBUG=0`.

## Muammo bo'lsa

- Oq sahifa: brauzerda `Ctrl+Shift+R`, kerak bo'lsa DevTools → Application → Service Workers → Unregister.
- Deploy Logs'da `collectstatic` va `gunicorn` qatorlarini tekshiring.
- `https://SIZNING-DOMEN/health/` → `{"status": "ok"}` qaytishi kerak.
