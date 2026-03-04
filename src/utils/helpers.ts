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
};

/**
 * Хелпер форматирования в дату YYYY-MM-DD
 */
export const formatDate = (value: Date | string | null | undefined): string | null => {
    if (!value) return null;
    
    if (typeof value === 'string') {
        
        return value.split('T')[0];
    }

    const year = value.getUTCFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};