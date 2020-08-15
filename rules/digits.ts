export default async function (value: any): Promise<void> {

    let v: string | null = null;
    if (typeof value === 'string') {
        v = value;
    } else if (typeof value === 'number') {
        v = value.toString();
    }

    if (v === null || !/^\d+$/.test(v)) {
        throw new Error('digits');
    }
}
