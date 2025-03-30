export type MissingFunctionToExecuteErrorMessage = `You must provide at least 1 function to execute.`;

export class MissingFunctionToExecuteError extends Error {
    constructor(
        message: MissingFunctionToExecuteErrorMessage
            = `You must provide at least 1 function to execute.`,
    ) {
        super(message);
    }
}
