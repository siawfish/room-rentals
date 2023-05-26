export const convertRouteToString = (string: string|string[]|null) => {
    if (string === null) return '';
    if (Array.isArray(string)) {
        return string.join('/');
    }
    return string;
}