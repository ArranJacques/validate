export default function getSize(value: any): number | null {

    if (typeof value === 'string') {
        return value.length;
    } else if (typeof value === 'number') {
        return value.toString().length;
    } else if (Array.isArray(value)) {
        return value.length;
    }

    return null;
}
