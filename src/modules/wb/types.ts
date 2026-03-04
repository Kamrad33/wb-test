// TODO необходим DI для палетов ТК структура для палетов другая
export interface WarehouseBoxTariff {
    warehouseName: string;
    geoName: string;
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
}

export interface WbApiResponse {
    response: {
        data: {
            dtNextBox: string;
            dtTillMax: string;
            warehouseList: WarehouseBoxTariff[];
        };
    };
}

// Тип для записи в БД (поля, которые мы сохраняем)
export interface BoxTariffRecord {
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
};

// тип в snake_case
export interface DbBoxTariffRecord {
    date: string;
    warehouse_name: string;
    geo_name: string | null;
    box_delivery_base: number | null;
    box_delivery_coef_expr: number | null;
    box_delivery_liter: number | null;
    box_delivery_marketplace_base: number | null;
    box_delivery_marketplace_coef_expr: number | null;
    box_delivery_marketplace_liter: number | null;
    box_storage_base: number | null;
    box_storage_coef_expr: number | null;
    box_storage_liter: number | null;
}