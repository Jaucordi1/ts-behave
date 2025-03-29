import type {IResultBase} from "../base";

/**
 * Represents the '**success**' result of an execution.
 * @template {any} TOutput The execution's '**success**' output data.
 */
export interface ISuccessResult<TData> extends IResultBase<"success"> {
    /**
     * The execution's '**success**' output data.
     */
    readonly data: TData;
}
