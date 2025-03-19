/**
 * Represents the '**failure**' result of an execution.
 * @template {any} TError Type of the error catch during '**failure**'.
 */
export interface IFailureResult<TError extends any> {

    /**
     * The type of result, '**failure**' in this case.
     */
    type: "failure";

    /**
     * The error thrown during execution's '**failure**'.
     */
    error: TError;

}
