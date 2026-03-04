import { parseNumeric } from '#utils/helpers.js';
import { fetchBoxTariffs } from '../infrastructure/apiClient.js';
import { upsertBoxTariffs } from '../infrastructure/repository.js';
import { IBoxTariffRecordDB, WarehouseBoxTariff } from '../types.js';

/**
 * USE-CASE загрузки тарифов коробов и сохранения в БД
 * @param apiToken WB токен
 */
export const fetchAndSaveBoxTariffs = async (apiToken: string): Promise<void> => {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    // TODO логирование
    console.log(`Fetching WB tariffs for date ${date}...`);

    try {
        const tariffsResponse = await fetchBoxTariffs(date, apiToken);
        const {
            dtNextBox,
            dtTillMax,
            warehouseList,
        } = tariffsResponse;
        
        // Преобразуем в формат для БД (ключи в snake_case)
        const records: IBoxTariffRecordDB[] = warehouseList.map((item: WarehouseBoxTariff) => ({
            date: date,
            warehouse_name: item.warehouseName,
            geo_name: item.geoName || null,
            box_delivery_base: parseNumeric(item.boxDeliveryBase),
            box_delivery_coef_expr: parseNumeric(item.boxDeliveryCoefExpr),
            box_delivery_liter: parseNumeric(item.boxDeliveryLiter),
            box_delivery_marketplace_base: parseNumeric(item.boxDeliveryMarketplaceBase),
            box_delivery_marketplace_coef_expr: parseNumeric(item.boxDeliveryMarketplaceCoefExpr),
            box_delivery_marketplace_liter: parseNumeric(item.boxDeliveryMarketplaceLiter),
            box_storage_base: parseNumeric(item.boxStorageBase),
            box_storage_coef_expr: parseNumeric(item.boxStorageCoefExpr),
            box_storage_liter: parseNumeric(item.boxStorageLiter),
            tariff_next_date: dtNextBox,
            tarif_end_date: dtTillMax,
        }));

        await upsertBoxTariffs(records);

        // TODO логирование
        console.log(`Saved ${records.length} tariff records for ${date}`);
    } catch (error) {
        // TODO логирование
        console.error('Error in fetchAndSaveTariffs:', error);

        throw error; // пробрасываем дальше, чтобы cron мог залогировать
    }
}