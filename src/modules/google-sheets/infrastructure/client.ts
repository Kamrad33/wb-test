import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import env from '#config/env/env.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../../../../');

let sheetsClient: any = null;

export const getSheetsClient = async () => {
    if (sheetsClient) return sheetsClient;

    const keyPath = path.resolve(projectRoot, env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH);
    
    const credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

    const auth = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheetsClient = google.sheets({ version: 'v4', auth });

    return sheetsClient;
}

export const ensureSheetExists =async (spreadsheetId: string, sheetName: string) => {
    const sheets = await getSheetsClient();

    try {
        // Проверяем, есть ли лист
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
        const sheet = spreadsheet.data.sheets?.find((s: any) => s.properties?.title === sheetName);

        if (!sheet) {
            // Создаём новый лист
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: {
                    requests: [
                        {
                            addSheet: {
                                properties: { title: sheetName },
                            },
                        },
                    ],
                },
            });

            console.log(`Sheet "${sheetName}" created in spreadsheet ${spreadsheetId}`);
        }
    } catch (error) {
        console.error(`Error ensuring sheet exists for ${spreadsheetId}:`, error);

        throw error;
    }
}

export const updateSheet = async (spreadsheetId: string, sheetName: string, data: string[][]) => {
    const sheets = await getSheetsClient();

    // Очищаем лист (все значения)
    await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: `${sheetName}!A:Z`,
    });

    // Записываем новые данные
    if (data.length > 0) {
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A1`,
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: data },
        });
    }

    console.log(`Sheet ${sheetName} in spreadsheet ${spreadsheetId} updated with ${data.length} rows`);
}