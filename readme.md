## Описание
Сервис для сбора ежедневных тарифов Wildberries (API коробов) и выгрузки их в Google Sheets.  
Работает в Docker, использует PostgreSQL, Knex и cron.

## Требования

- Установленные **Docker** и **docker-compose** (или **Docker Desktop**).
- Токен доступа к **Wildberries API**.
- **Google Cloud проект** с включённым **Google Sheets API** и сервисным аккаунтом.

## Запуск

### 1️⃣ Клонируйте репозиторий

```bash
git clone <url>
cd wb-test
```
### 2️⃣ Добавьте переменные окружения
Создайте .env файл на основе example.env и заполните его вашими данными. При необходимости можете настроить расписание cron

### 3️⃣ Настройте Google Sheets
Получите ключ в ЛК Google Cloud для Google Sheets API.
Добавьте данные private_key и client_email в переменные окружения

### 4️⃣ Добавьте ID ваших таблиц в env
ID таблиц можно взять из URL, и должны указываться через запятую без пробела
Например: https://docs.google.com/spreadsheets/d/ваш_id_таблицы_1

```bash
GOOGLE_SERVICE_SPREADSHEET_IDS=id_1,id_2,id_3
```
при необходимости можно добавлять таблицы через seed

6️⃣ Запустите приложение

```bash
docker compose up -d --build
```