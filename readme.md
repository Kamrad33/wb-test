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
git clone <url-вашего-репозитория>
cd wb-test
```
### 2️⃣ Добавьте переменные окружения
Создайте .env файл на основе example.env и заполните его вашими данными. При необходимости можете настроить расписание cron

### 3️⃣ Настройте Google Sheets
Получите ключ в ЛК Google Cloud для Google Sheets API.
Переименуйте файл клчюа в google-credentials.json и добавьте его в корень проекта.

### 4️⃣ Добавьте ID ваших таблиц в базу данных
Seed-файл (src/postgres/seeds/spreadsheets.js) по умолчанию вставляет фиктивный ID.
Замените его на реальные ID ваших таблиц, из google sheets. ID таблицы можно взять из URL
Например: https://docs.google.com/spreadsheets/d/ваш_id_таблицы_1

```bash
// src/postgres/seeds/spreadsheets.js
export async function seed(knex) {
  await knex("spreadsheets")
    .insert([
      { spreadsheet_id: "ваш_id_таблицы_1" },
      { spreadsheet_id: "ваш_id_таблицы_2" } // если несколько
    ])
    .onConflict(["spreadsheet_id"])
    .ignore();
}
```

6️⃣ Запустите приложение

```bash
docker compose up -d --build
```