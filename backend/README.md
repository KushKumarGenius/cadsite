# CAD Crew signup API (Django)

Stores sign-up form submissions in the **Django admin** only (`/admin/`). The public Next.js site never talks to Django directly from the browser — it posts to a Next.js route that forwards requests here with a shared secret.

## Setup (local)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
# Always use the venv’s Python so Django installs locally (not system-wide).
```

Create `.env` (not committed) — copy from `.env.example` and set:

- `DJANGO_SECRET_KEY` — long random string (`openssl rand -hex 32`)
- `SIGNUP_INGEST_KEY` — long random string (must match `DJANGO_SIGNUP_INGEST_KEY` in the Next.js `.env.local`)

```bash
export DJANGO_SECRET_KEY="..."
export SIGNUP_INGEST_KEY="..."
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

Open **http://127.0.0.1:8000/admin/** and sign in to view **Sign up submissions**.

## Next.js env

In the project root `.env.local`:

```
DJANGO_SIGNUP_URL=http://127.0.0.1:8000
DJANGO_SIGNUP_INGEST_KEY=<same value as SIGNUP_INGEST_KEY>
```

Restart `next dev` after changing env vars.

## Production notes

- Run Django behind HTTPS; restrict `/admin/` by VPN or IP allowlist if possible.
- Set `DJANGO_DEBUG=0`, use a strong `DJANGO_SECRET_KEY`, and keep `SIGNUP_INGEST_KEY` private (only on the server + CI).
- Consider PostgreSQL instead of SQLite by changing `DATABASES` in `cadcrew/settings.py`.
