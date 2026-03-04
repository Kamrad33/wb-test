import { formatDate } from '#utils/helpers.js';
import { ensureSheetExists, updateSheet } from '../infrastructure/client.js';
import { getSpreadsheetIds, getTodayTariffs } from '../infrastructure/repository.js';
import { BoxTariffData } from '../types.js';

const SHEET_NAME = 'stocks_coefs';

const prepareData = (tariffs: BoxTariffData[]): string[][] => {
    // Заголовки
    const headers = [
        'Дата',
        'Название склада',
        'Регион склада',
        'Базовая ставка доставки',
        'Коэф. доставки',
        'Ставка за литр доставки',
        'Базовая ставка доставки (МП)',
        'Коэф. доставки (МП)',
        'Cтавка за литр доставки (МП)',
        'Базовая ставка хранения',
        'Коэф. хранения',
        'Ставка за литр хранения',
        'Следующая дата',
        'Дата окончания',
    ];

    const rows = tariffs.map(t => [
        formatDate(t.date)!,
        t.warehouseName,
        t.geoName || '-',
        t.boxDeliveryBase?.toString() ?? '-',
        t.boxDeliveryCoefExpr?.toString() ?? '-',
        t.boxDeliveryLiter?.toString() ?? '-',
        t.boxDeliveryMarketplaceBase?.toString() ?? '-',
        t.boxDeliveryMarketplaceCoefExpr?.toString() ?? '-',
        t.boxDeliveryMarketplaceLiter?.toString() ?? '-',
        t.boxStorageBase?.toString() ?? '-',
        t.boxStorageCoefExpr?.toString() ?? '-',
        t.boxStorageLiter?.toString() ?? '-',
        formatDate(t.dtNextBox) ?? '-',
        formatDate(t.dtTillMax) ?? '-',
    ]);

    return [headers, ...rows];
}

export const syncToSheets = async (): Promise<void> =>{
    console.log('Starting Google Sheets sync...');

    try {
        const spreadsheetIds = await getSpreadsheetIds();

        if (spreadsheetIds.length === 0) {
            console.log('No spreadsheet IDs found in database. Skipping sync.');

            return;
        }

        const tariffs = await getTodayTariffs();

        if (tariffs.length === 0) {
            console.log('No tariffs found for today. Skipping sync.');
            return;
        }

        const data = prepareData(tariffs);

        for (const spreadsheetId of spreadsheetIds) {
            try {
                await ensureSheetExists(spreadsheetId, SHEET_NAME);
                await updateSheet(spreadsheetId, SHEET_NAME, data);
            } catch (error) {
                console.error(`Failed to update spreadsheet ${spreadsheetId}:`, error);
            }
        }

        console.log('Google Sheets sync completed.');
    } catch (error) {
        console.error('Error in syncToSheets:', error);

        throw error;
    }
}