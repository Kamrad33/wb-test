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

export interface WbApiResponseData {
    dtNextBox: string;
    dtTillMax: string;
    warehouseList: WarehouseBoxTariff[];
};

export interface WbApiResponse {
    response: {
        data: WbApiResponseData;
    };
};

// тип в snake_case для knex записи в бд
export interface IBoxTariffRecordDB {
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
    tariff_next_date: string | null;
    tarif_end_date: string | null;
}