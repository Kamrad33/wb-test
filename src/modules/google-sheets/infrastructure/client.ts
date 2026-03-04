import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import env from '#config/env/env.js';


let sheetsClient: any = null;

export const getSheetsClient = async () => {
    if (sheetsClient) return sheetsClient;


    const auth = new JWT({
        email: env.GOOGLE_SERVICE_CLIENT_EMAIL,
        key: env.GOOGLE_SERVICE_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheetsClient = google.sheets({ version: 'v4', auth });

    return sheetsClient;
}

export const ensureSheetExists = async (spreadsheetId: string, sheetName: string): Promise<number> => {
    const sheets = await getSheetsClient();

    try {
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
        const sheet = spreadsheet.data.sheets?.find((s: any) => s.properties?.title === sheetName);

        if (sheet) {
            // Лист уже существует – возвращаем его sheetId
            return sheet.properties.sheetId;
        }

        // Создаём новый лист
        const response = await sheets.spreadsheets.batchUpdate({
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

        const sheetId = response.data.replies?.[0]?.addSheet?.properties?.sheetId;

        if (!sheetId) {
            throw new Error(`Failed to create sheet "${sheetName}" in ${spreadsheetId}`);
        }

        console.log(`Sheet "${sheetName}" created in spreadsheet ${spreadsheetId}`);

        return sheetId;
    } catch (error) {
        console.error(`Error ensuring sheet exists for ${spreadsheetId}:`, error);
        throw error;
    }
}

export const freezeHeaderRow = async (spreadsheetId: string, sheetId: number) => {
    const sheets = await getSheetsClient();

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
            requests: [
                {
                    updateSheetProperties: {
                        properties: {
                            sheetId,
                            gridProperties: {
                                frozenRowCount: 1,
                            },
                        },
                        fields: 'gridProperties.frozenRowCount',
                    },
                },
            ],
        },
    });
}

export const updateSheet = async (spreadsheetId: string, sheetName: string, data: string[][]) => {
    const sheets = await getSheetsClient();
    const sheetId = await ensureSheetExists(spreadsheetId, sheetName);

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

    // Замораживаем первую строку (заголовки)
    await freezeHeaderRow(spreadsheetId, sheetId);

    console.log(`Sheet ${sheetName} in spreadsheet ${spreadsheetId} updated with ${data.length} rows and header frozen`);
}