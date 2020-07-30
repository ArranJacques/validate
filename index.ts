import * as r from './rules';
import { ValidationError } from './support/errors';
import { ValidationRule } from './support/types';

const Rules: { [key: string]: ValidationRule } = {
    digits: r.digits,
    email: r.email,
    matches: r.matches,
    max: r.max,
    min: r.min,
    required: r.required
};

export function registerRule(name: string, rule: ValidationRule) {
    Rules[name] = rule;
}

function parseRule(rule: string): [ValidationRule, any[] | undefined] {
    const [name, args] = rule.split(':');
    const funcName = name.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, ({}, chr) => chr.toUpperCase());
    return Rules[funcName] !== undefined
        ? [Rules[funcName], args ? args.split(',') : undefined]
        : [async () => true, undefined];
}

async function validate(prop: string, value: any, rules: string[] | undefined): Promise<true> {

    if (!rules || !rules.length) {
        return true;
    }

    let hasValue: true | Error;
    try {
        hasValue = await Rules.required(value);
    } catch (e) {
        hasValue = e;
    }

    const requiredIndex = rules.indexOf('required');

    if (requiredIndex > -1) {
        rules.splice(requiredIndex, 1);
        if (hasValue !== true) {
            throw hasValue;
        }
    } else {
        if (hasValue !== true) {
            return true;
        }
    }

    for (const rule of rules) {
        const [func, args] = parseRule(rule);
        await func(value, args, prop);
    }

    return true;
}

export default async function <R>(
    data: { [key: string]: any },
    rules: { [key: string]: string[] },
    messages?: { [key: string]: string }
): Promise<R> {

    const errors: { [key: string]: string } = {};

    for (const prop of Object.keys(rules)) {
        try {
            await validate(prop, data[prop], rules[prop]);
        } catch (e) {
            const messageKey = `${prop}.${e.message}`;
            errors[prop] = messages && messages[messageKey] ? messages[messageKey] : e.message;
        }
    }

    if (Object.keys(errors).length) {
        throw new ValidationError(errors);
    }

    return data as R;
}
