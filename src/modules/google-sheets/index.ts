import cron from 'node-cron';
import { syncToSheets } from './application/syncToSheets.js';
import env from '#config/env/env.js';

let isRunning = false;

export const startGSCron = () => {
    const schedule = env.GOOGLE_SERVICE_CRON_SCHEDULE;

    console.log(`Starting Google Sheets cron with schedule: ${schedule}`);

    cron.schedule(schedule, async () => {
        if (isRunning) {
            console.log('Previous Google Sheets task still running, skipping...');

            return;
        }

        isRunning = true;

        try {
            await syncToSheets();
        } catch (error) {
            console.error('Google Sheets cron job failed:', error);
        } finally {
            isRunning = false;
        }
    });
}