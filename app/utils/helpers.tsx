export const convertRouteToString = (string: string|string[]|null) => {
    if (string === null) return '';
    if (Array.isArray(string)) {
        return string.join('/');
    }
    return string;
}


export const convertFromPluralToSingular = (word: string) => {
    if (word.endsWith('s')) {
        return word.slice(0, -1);
    }
    return word;
}

export const convertDateStringToDate = (dateString: string) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');
    const dateObject = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds));
    return dateObject;
}