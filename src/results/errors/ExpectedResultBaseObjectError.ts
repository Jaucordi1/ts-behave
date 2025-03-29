export class ExpectedResultBaseObjectError extends Error {
    constructor(value: unknown) {
        super(
            `Value should be a valid result object ('${typeof value}' given).`,
            {cause: value},
        );
    }
}
