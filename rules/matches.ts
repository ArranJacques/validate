import { Failed } from '../support/errors';

export default async function (value: any, args?: string[]): Promise<void> {

    let v: string | null = null;
    if (typeof value === 'string') {
        v = value;
    } else if (typeof value === 'number') {
        v = value.toString();
    }

    if (v === null || !args || !args.length || args.indexOf(value) === -1) {
        throw new Failed('matches');
    }
}
