# Мебель Империи — каталог кухонь

Каталог кухонь с заявками и админ‑панелью. Проект состоит из `frontend` (React/Vite) и `backend` (Node.js/Express + Prisma).

## Быстрый запуск локально

### Backend
1. Откройте папку `backend`
2. Создайте `.env` на базе `.env.example`
3. Установите зависимости и запустите миграции:
   - `npm install`
   - `npx prisma generate`
   - `npx prisma migrate dev`
4. Запуск сервера:
   - `npm run dev`

API будет доступен на `http://localhost:5000/api`.

### Frontend
1. Откройте папку `frontend`
2. Создайте `.env` на базе `.env.example`
3. Установите зависимости и запустите:
   - `npm install`
   - `npm run dev`

Сайт будет доступен на `http://localhost:5173`.

## Переменные окружения

### Backend (`backend/.env`)
- `PORT=5000`
- `DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"`
- `JWT_SECRET=your-secret-key-here`
- `ALLOW_ADMIN_REGISTER=true`
- `CORS_ORIGIN=http://localhost:5173`

### Frontend (`frontend/.env`)
- `VITE_API_URL=http://localhost:5000/api`

## Деплой (рекомендуемый вариант)

### Backend на Render
1. Создайте PostgreSQL базу в Render
2. Создайте новый **Web Service** из репозитория (root: `backend`)
3. Build command:
   - `npm install && npx prisma generate && npx prisma migrate deploy`
4. Start command:
   - `npm start`
5. Добавьте переменные окружения:
   - `DATABASE_URL` (из Render PostgreSQL)
   - `JWT_SECRET=...`
   - `ALLOW_ADMIN_REGISTER=true` (на время первичной регистрации)
   - `CORS_ORIGIN=https://imperii.kz`
6. Подключите домен `api.imperii.kz` в Render и получите CNAME для DNS

### Frontend на Vercel
1. Импортируйте проект из репозитория
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Переменная окружения:
   - `VITE_API_URL=https://api.imperii.kz/api`
6. Подключите домены `imperii.kz` и `www.imperii.kz` в Vercel

### DNS в PS.kz
1. Добавьте записи для `imperii.kz` и `www` по инструкции Vercel
2. Добавьте `CNAME` для `api` на цель, выданную Render

## Важно

- При переходе на PostgreSQL данные из SQLite не переносятся автоматически

## SEO и домен

- Обновите домен в `frontend/public/sitemap.xml` и `frontend/public/robots.txt`
- Замените `og:image` в `frontend/index.html` и добавьте файл `frontend/public/og-image.png`
- Подключите домен в Vercel и укажите его в `CORS_ORIGIN`

## Структура проекта

- `frontend/` — клиентская часть (каталог, заявки, админка)
- `backend/` — API, авторизация админа, CRUD, заявки, загрузка изображений
