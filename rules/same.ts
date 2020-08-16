import { Failed } from '../support/errors';
import { Data } from '../support/types';

export default async function (value: any, args?: string[], _prop?: string, data?: Data): Promise<void> {
    if (!args || !args.length || !data || data[args[0]] !== value) {
        throw new Failed('same');
    }
}
