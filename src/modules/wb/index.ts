import cron from 'node-cron';
import env from '#config/env/env.js';
import { fetchAndSaveBoxTariffs } from './application/fetchAndSaveBoxTarifs.js';

let isRunning = false;

export const startWbCron = () => {
    const schedule = env.WB_CRON_SCHEDULE;

    console.log(`Starting WB cron with schedule: ${schedule}`);

    cron.schedule(schedule, async () => {
        if (isRunning) {
            console.log('Previous WB task still running, skipping...');
            return;
        }

        isRunning = true;

        try {
            await fetchAndSaveBoxTariffs(env.WB_API_TOKEN);
        } catch (error) {
            console.error('WB cron job failed:', error);
        } finally {
            isRunning = false;
        }
    });
};