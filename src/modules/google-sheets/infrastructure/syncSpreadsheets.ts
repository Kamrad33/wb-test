import knex from '../../../postgres/knex.js';
import { DB_TABLES } from '#shared/types.js';
import env from '#config/env/env.js';

export const syncSpreadsheets = async (): Promise<void> => {
    const envIds = env.GOOGLE_SERVICE_SPREADSHEET_IDS.split(',').map(id => id.trim()).filter(Boolean) || [];

    if (envIds.length === 0) {
        console.log('No spreadsheet IDs in GOOGLE_SPREADSHEET_IDS. Clearing spreadsheets table.');

        await knex(DB_TABLES.SPREADSHEETS).del();

        return;
    }

    // Удаляем ID, которых нет в env
    await knex(DB_TABLES.SPREADSHEETS)
        .whereNotIn('spreadsheet_id', envIds)
        .del();

    // Вставляем новые ID (из env, которых нет в таблице)
    const existingIds = await knex(DB_TABLES.SPREADSHEETS).select('spreadsheet_id');
    const existingSet = new Set(existingIds.map(row => row.spreadsheet_id));
    const newIds = envIds.filter(id => !existingSet.has(id));

    if (newIds.length > 0) {
        await knex(DB_TABLES.SPREADSHEETS)
        .insert(newIds.map(id => ({ spreadsheet_id: id })))
        .onConflict(['spreadsheet_id'])
        .ignore();
    }

    console.log(`Spreadsheets synced: ${envIds.length} total, ${newIds.length} added, ${existingIds.length - (existingIds.length - (await knex(DB_TABLES.SPREADSHEETS).whereIn('spreadsheet_id', envIds).select('spreadsheet_id')).length)} removed.`);
};