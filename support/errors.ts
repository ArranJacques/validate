export class Failed extends Error {
    constructor(rule: string) {
        super(rule);
        this.name = 'Failed';
    }
}

export class InvalidRule extends Error {
    constructor(name: string) {
        super(`{${name}} is not a valid validation rule`);
        this.name = 'InvalidRule';
    }
}

export class ValidationError extends Error {

    errors: { [key: string]: string };

    constructor(errors: { [key: string]: string }) {
        super('validation failed');
        this.name = 'ValidationError';
        this.errors = errors;
    }
}
