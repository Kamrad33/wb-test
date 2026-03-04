import { BoxTariffDB, DB_TABLES } from '#shared/types.js';
import knex from '../../../postgres/knex.js';
import { BoxTariffData } from '../types.js';

export const getSpreadsheetIds = async (): Promise<string[]> => {
    const rows = await knex(DB_TABLES.SPREADSHEETS).select('spreadsheet_id');

    return rows.map(row => row.spreadsheet_id);
};

export const getTodayTariffs = async (): Promise<BoxTariffData[]> => {
    const date = new Date().toISOString().split('T')[0];

    const rows: BoxTariffDB[] = await knex(DB_TABLES.WB_BOX_TARIFFS)
        .select('*')
        .where('date', date)
        .orderBy('box_delivery_coef_expr', 'asc'); // сортировка по возрастанию

    return rows.map((row: BoxTariffDB) => ({
        date: row.date,
        warehouseName: row.warehouse_name,
        geoName: row.geo_name,
        boxDeliveryBase: row.box_delivery_base,
        boxDeliveryCoefExpr: row.box_delivery_coef_expr,
        boxDeliveryLiter: row.box_delivery_liter,
        boxDeliveryMarketplaceBase: row.box_delivery_marketplace_base,
        boxDeliveryMarketplaceCoefExpr: row.box_delivery_marketplace_coef_expr,
        boxDeliveryMarketplaceLiter: row.box_delivery_marketplace_liter,
        boxStorageBase: row.box_storage_base,
        boxStorageCoefExpr: row.box_storage_coef_expr,
        boxStorageLiter: row.box_storage_liter,
        dtNextBox: row.tariff_next_date,
        dtTillMax: row.tarif_end_date,
    }));
};