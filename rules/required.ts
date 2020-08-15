import { Failed } from '../support/errors';

export default async function (value: any): Promise<void> {
    if (value === undefined || value === null || value === '') {
        throw new Failed('required');
    }
}
