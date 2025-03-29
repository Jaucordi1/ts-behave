import type {IResultBase} from "../base";

/**
 * Represents the '**failure**' result of an execution.
 * @template {any} TError Type of the error catch during '**failure**'.
 */
export interface IFailureResult<TError> extends IResultBase<"failure">{
    /**
     * The error thrown during execution's '**failure**'.
     */
    readonly error: TError;
}
