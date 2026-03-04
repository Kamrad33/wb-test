export const enum DB_TABLES {
    WB_BOX_TARIFFS = 'wb_box_tariffs',
    SPREADSHEETS = 'spreadsheets',
};

/**
 * Структура записи тарифов коробов из БД
 */
export type BoxTariffDB = {
    id: number;
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
    updated_at: number;
}