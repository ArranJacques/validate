export class ValidationError extends Error {

    errors: { [key: string]: string };

    constructor(errors: { [key: string]: string }) {
        super('validation failed');
        this.name = 'ValidationError';
        this.errors = errors;
    }
}
