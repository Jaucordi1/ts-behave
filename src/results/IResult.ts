import type {IFailureResult} from "./failure";
import type {ISuccessResult} from "./success";

/**
 * Represents an execution's result object.
 * It can be of type '**success**' or '**failure**'.
 * @template {any} TData The output data in case of '**success**'.
 * @template {any} TError The error catch in case of '**failure**'.
 * @template {ISuccessResult<TData>} TSuccess The result object in case of '**success**'.
 * @template {IFailureResult<TError>} TFailure The result object in case of '**failure**'.
 */
export type IResult<
    TData = any,
    TError = any,
    TSuccess extends ISuccessResult<TData> = ISuccessResult<TData>,
    TFailure extends IFailureResult<TError> = IFailureResult<TError>,
> = | TSuccess
    | TFailure;
