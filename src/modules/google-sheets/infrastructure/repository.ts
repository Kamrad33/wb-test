import knex from '../../../postgres/knex.js';
import { SpreadsheetRow, BoxTariffData } from '../types.js';

export const getSpreadsheetIds = async (): Promise<string[]> => {
    const rows = await knex('spreadsheets').select('spreadsheet_id');

    return rows.map(row => row.spreadsheet_id);
};

export const getTodayTariffs = async (): Promise<BoxTariffData[]> => {
    const date = new Date().toISOString().split('T')[0];

    const rows = await knex('wb_tariffs')
        .select(
        'warehouse_name',
        'geo_name',
        'box_delivery_base',
        'box_delivery_coef_expr',
        'box_delivery_liter',
        'box_delivery_marketplace_base',
        'box_delivery_marketplace_coef_expr',
        'box_delivery_marketplace_liter',
        'box_storage_base',
        'box_storage_coef_expr',
        'box_storage_liter'
        )
        .where('date', date)
        .orderBy('box_storage_coef_expr', 'asc'); // сортировка по возрастанию

    return rows.map(row => ({
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
    }));
};