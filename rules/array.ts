export default async function (value: any): Promise<void> {
    if (!Array.isArray(value)) {
        throw new Error('array');
    }
}
