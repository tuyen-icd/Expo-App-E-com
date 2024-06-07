export const capitalizeFirstLetter = (str: string) => {
    if (!str) return str; // Handle empty string or null/undefined
    const stringValue = String(str);
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
}