export default async function (value: any): Promise<void> {

    let v: string | null = null;
    if (typeof value === 'string') {
        v = value;
    }

    // anystring@anystring.anystring
    if (v === null || !/\S+@\S+\.\S+/.test(v)) {
        throw new Error('email');
    }
}
