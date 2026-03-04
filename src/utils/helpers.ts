/**
 * Хелпер для парсинга чисел с запятой и обработки прочерков
 * @param value 
 * @returns 
 */
export const  parseNumeric = (value: string): number | null => {
    if (value === '-' || value === '' || value === null) return null;

    // заменяем запятую на точку и убираем пробелы
    const normalized = value.replace(',', '.').replace(/\s/g, '');
    const num = parseFloat(normalized);

    return isNaN(num) ? null : num;
}