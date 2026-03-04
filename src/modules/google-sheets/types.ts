// Тип для записи, которую будем выводить в таблицу
export interface SheetRow {
    warehouseName: string;
    coefficient: number | null; // box_storage_coef_expr
}

// Тип для данных из БД
export interface BoxTariffData {
    date: string;
    warehouseName: string;
    geoName: string | null;
    boxDeliveryBase: number | null;
    boxDeliveryCoefExpr: number | null;
    boxDeliveryLiter: number | null;
    boxDeliveryMarketplaceBase: number | null;
    boxDeliveryMarketplaceCoefExpr: number | null;
    boxDeliveryMarketplaceLiter: number | null;
    boxStorageBase: number | null;
    boxStorageCoefExpr: number | null;
    boxStorageLiter: number | null;
}

// Тип для spreadsheet из таблицы БД
export interface SpreadsheetRow {
    spreadsheet_id: string;
}