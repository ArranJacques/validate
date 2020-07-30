import getSize from '../support/get-size';

export default async function (value: any, args?: string[]): Promise<true> {
    const length = getSize(value);
    if (length === null || !args || !args.length || length !== parseInt(args[0])) {
        throw new Error('length');
    }
    return true;
}
