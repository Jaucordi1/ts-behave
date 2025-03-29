import {ResultBase} from "../base";
import type {ISuccessResult} from "./ISuccessResult";

/**
 * '**Success**' result object of an execution.
 * @template {any} TOutput The execution's '**success**' output data.
 * @implements {ISuccessResult<TOutput>} Constrained to the {@link ISuccessResult|'**success**' result object interface}.
 */
export class SuccessResult<TData> extends ResultBase<"SUCCESS"> implements ISuccessResult<TData> {
    /**
     * Construct a new '**success**' result object, passing the execution's output data.
     * @param {TOutput} data The execution's '**success**' output data.
     */
    constructor(
        /**
         * The execution's '**success**' output data.
         */
        public readonly data: TData,
    ) {
        super("success");
    }
}
