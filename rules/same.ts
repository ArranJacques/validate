import { Data } from '../support/types';

export default async function (value: any, args: string[], _prop: string, data: Data): Promise<void> {
    if (!args.length || data[args[0]] !== value) {
        throw new Error('same');
    }
}
