import { DB_TABLES } from '#shared/types.js';
import knex from '../../../postgres/knex.js';
import { IBoxTariffRecordDB } from '../types.js';

/**
 * Запись тарифов
 * @param records Массив записей в БД
 */
export const upsertBoxTariffs = async (records: IBoxTariffRecordDB[]): Promise<void> => {
    await knex(DB_TABLES.WB_BOX_TARIFFS)
        .insert(records)
        .onConflict(['date', 'warehouse_name'])
        .merge({
            geo_name: knex.raw('EXCLUDED.geo_name'),
            box_delivery_base: knex.raw('EXCLUDED.box_delivery_base'),
            box_delivery_coef_expr: knex.raw('EXCLUDED.box_delivery_coef_expr'),
            box_delivery_liter: knex.raw('EXCLUDED.box_delivery_liter'),
            box_delivery_marketplace_base: knex.raw('EXCLUDED.box_delivery_marketplace_base'),
            box_delivery_marketplace_coef_expr: knex.raw('EXCLUDED.box_delivery_marketplace_coef_expr'),
            box_delivery_marketplace_liter: knex.raw('EXCLUDED.box_delivery_marketplace_liter'),
            box_storage_base: knex.raw('EXCLUDED.box_storage_base'),
            box_storage_coef_expr: knex.raw('EXCLUDED.box_storage_coef_expr'),
            box_storage_liter: knex.raw('EXCLUDED.box_storage_liter'),
            updated_at: knex.fn.now(),
            tariff_next_date: knex.raw('EXCLUDED.tariff_next_date'),
            tarif_end_date: knex.raw('EXCLUDED.tarif_end_date'),
        });
}