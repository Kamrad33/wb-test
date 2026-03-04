// Тип для записи, которую будем выводить в таблицу
export interface SheetRow {
    warehouseName: string;
    coefficient: number | null; // box_storage_coef_expr
}

// Тип для записи в БД (поля, которые мы сохраняем)
export interface BoxTariffData {
    date: string;                                   // дата в формате YYYY-MM-DD
    warehouseName: string;                          // название склада
    geoName: string | null;                         // регион
    boxDeliveryBase: number | null;                 // базовая ставка доставки
    boxDeliveryCoefExpr: number | null;             // коэффициент доставки
    boxDeliveryLiter: number | null;                // ставка за литр доставки
    boxDeliveryMarketplaceBase: number | null;      // базовая ставка доставки маркетплейса
    boxDeliveryMarketplaceCoefExpr: number | null;  // коэффициент доставки маркетплейса
    boxDeliveryMarketplaceLiter: number | null;     // ставка за литр доставки маркетплейса
    boxStorageBase: number | null;                  // базовая ставка хранения
    boxStorageCoefExpr: number | null;              // коэффициент хранения
    boxStorageLiter: number | null;                 // ставка за литр хранения
    dtTillMax: string | null;                       // дата, с которой начнут действовать следующие тарифы
    dtNextBox: string | null;                       // максимальная дата, до которой актуальны текущие тарифы
};

// Тип для spreadsheet из таблицы БД
export interface SpreadsheetRow {
    spreadsheet_id: string;
}