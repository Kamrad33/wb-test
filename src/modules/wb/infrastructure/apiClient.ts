import axios from 'axios';
import { WbApiResponse, WbApiResponseData } from '../types.js';

/**
 * Получение тарифа коробов на указанную дату
 * @param date Дата в формате YYYY-MM-DD
 * @param apiToken WB Токен авторизации
 * @returns массив WarehouseTariff
 */
export const fetchBoxTariffs = async(date: string, apiToken: string): Promise<WbApiResponseData> => {
    const url = 'https://common-api.wildberries.ru/api/v1/tariffs/box';

    const response = await axios.get<WbApiResponse>(url, {
        headers: { Authorization: `Bearer ${apiToken}` },
        params: { date },
    });

    return response.data.response.data;
};