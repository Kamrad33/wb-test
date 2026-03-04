import knex from '../../../postgres/knex.js';
import { BoxTariffRecord, DbBoxTariffRecord } from '../types.js';

/**
 * Запись тарифов
 * @param records Массив записей в БД
 */
export async function upsertBoxTariffs(records: DbBoxTariffRecord[]): Promise<void> {
  await knex('wb_tariffs')
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
    });
}