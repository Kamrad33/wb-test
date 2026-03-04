import knex, { migrate, seed } from "#postgres/knex.js";
import { startWbCron } from "#modules/wb/index.js";
import http from 'http';
import { startGSCron } from "#modules/google-sheets/index.js";
import { syncSpreadsheets } from "#modules/google-sheets/infrastructure/syncSpreadsheets.js";

// Запускаем миграции и сиды
await migrate.latest();
// await seed.run(); // использование сидов отключено, чтобы не трекать ID таблиц в git

await syncSpreadsheets()

console.log("All migrations and seeds have been run");

// Запускаем cron задачи
startWbCron();
startGSCron();

// health check
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
});

const port = process.env.APP_PORT || 5000;

server.listen(port, () => {
    console.log(`Health check server listening on port ${port}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
    console.log(`Received ${signal}, closing server and database connections...`);

    server.close(() => {
        console.log('HTTP server closed.');
    });

    try {
        await knex.destroy();

        console.log('Database connection closed.');
        process.exit(0);
    } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
    }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));