import type {IFailureResult} from "./failure";
import type {ISuccessResult} from "./success";

/**
 * Represents an execution's result object.
 * It can be of type '**success**' or '**failure**'.
 * @template {any} TSuccessData The output data in case of '**success**'.
 * @template {any} TErrorThrown The error catch in case of '**failure**'.
 */
export type IResult<
    TSuccessData extends any = any,
    TErrorThrown extends any = any,
> = | ISuccessResult<TSuccessData>
    | IFailureResult<TErrorThrown>;
