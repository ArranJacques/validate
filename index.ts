import * as r from './rules';
import { ValidationError } from './support/errors';
import { Data, ValidationRule } from './support/types';

const Rules: { [key: string]: ValidationRule } = {
    array: r.array,
    digits: r.digits,
    email: r.email,
    matches: r.matches,
    max: r.max,
    min: r.min,
    required: r.required,
    same: r.same
};

export function registerRule(name: string, rule: ValidationRule) {
    Rules[name] = rule;
}

function parseRule(rule: string): [ValidationRule, string[]] {
    const [name, args] = rule.split(':');
    const funcName = name.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, ({}, chr) => chr.toUpperCase());
    return Rules[funcName] !== undefined
        ? [Rules[funcName], args ? args.split(',') : []]
        : [async () => {}, undefined];
}

async function validate(prop: string, value: any, rules: string[], data: Data): Promise<void> {

    if (!rules.length) {
        return;
    }

    let hasValue: true | Error;
    try {
        await Rules.required(value, [], prop, data);
        hasValue = true;
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
            return;
        }
    }

    for (const rule of rules) {
        const [func, args] = parseRule(rule);
        await func(value, args, prop, data);
    }
}

export default async function <R>(
    data: Data,
    rules: { [key: string]: string[] },
    messages?: { [key: string]: string }
): Promise<R> {

    const errors: { [key: string]: string } = {};

    for (const prop of Object.keys(rules)) {
        try {
            const r = typeof rules[prop] === 'undefined' ? [] : rules[prop];
            await validate(prop, data[prop], r, data);
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
