# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flask web application for managing a MySQL Sakila sample database (DVD rental store). Provides CRUD operations, reporting, and CSV export for films, actors, customers, rentals, staff, inventory, and stores.

## Running the Application

```bash
# Install dependencies
pip install -r requirements.txt

# Run locally (requires MySQL with sakila database)
python app.py
# Runs on http://0.0.0.0:5000 with debug=True

# Docker
docker build -t sakila-app .
docker run -p 5000:5000 sakila-app
```

Database connection defaults to `mysql-container` host (Docker networking). For local development, update `MYSQL_HOST` in `config.py`.

## Architecture

**Single-file Flask app** — all routes and database logic live in `app.py` (~1100 lines). No ORM; raw SQL via PyMySQL with `DictCursor`.

- `config.py` — MySQL connection settings and Flask secret key
- `app.py` — all route handlers, DB queries, and `get_db_connection()` helper
- `templates/` — Jinja2 templates extending `base.html`
- `static/` — `style.css` and `script.js`

### Database Pattern

Every route opens a connection via `get_db_connection()`, executes queries with a context-managed cursor, and closes the connection. No connection pooling. Errors are caught with try/except and flashed to the user.

### Key Routes

| Path | Purpose |
|------|---------|
| `/` | Dashboard with aggregate stats |
| `/films`, `/actors`, `/customers`, `/rentals`, `/staff`, `/inventory`, `/stores` | List views with search/filter/pagination |
| `/films/add`, `/films/edit/<id>` | Film CRUD forms |
| `/films/<id>` | Film detail with actors and inventory |
| `/films/export` | CSV export |
| `/actors/add`, `/actors/edit/<id>`, `/actors/delete/<id>` | Actor CRUD (POST-based) |
| `/api/actor/<id>`, `/api/film/<id>` | JSON API endpoints |
| `/reports` | Revenue, top films, top customers analytics |

### Database

MySQL Sakila sample database. Key tables: `film`, `actor`, `customer`, `rental`, `payment`, `inventory`, `store`, `staff`, `category`, `film_actor`, `film_category`.

## Dependencies

- Flask 2.3.3
- PyMySQL 1.1.0 (MySQL driver)
- WTForms 3.0.1 (form handling)
- cryptography (PyMySQL SSL support)
