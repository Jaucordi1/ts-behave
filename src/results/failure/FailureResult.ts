import {ResultBase} from "../base";
import type {IFailureResult} from "./IFailureResult";

/**
 * '**Failure**' result object of an execution
 * @template {any} TError The error catch during '**failure**'
 * @implements {IFailureResult<TError>} Constrained to the {@link IFailureResult|'**failure**' result object interface}
 */
export class FailureResult<TError> extends ResultBase<"FAILURE"> implements IFailureResult<TError> {
    /**
     * Construct a new '**failure**' result object, passing the error thrown during the execution's '**failure**'
     * @param {TError} error Error thrown during execution
     */
    constructor(
        /**
         * The error thrown during execution's '**failure**'
         */
        public readonly error: TError,
    ) {
        super("failure");
    }
}
