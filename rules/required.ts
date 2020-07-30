export default async function (value: any): Promise<true> {
    if (value === undefined || value === null || value === '') {
        throw new Error('required');
    }
    return true;
}
