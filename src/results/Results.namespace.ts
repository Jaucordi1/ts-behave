import {assertsResultObject, isResultBaseObject} from "./base";
import {assertsFailureResult, FailureResult, type IFailureResult, isFailureResult} from "./failure";
import type {IResult} from "./IResult";
import {assertsSuccessResult, isSuccessResult, type ISuccessResult, SuccessResult} from "./success";
import {assertsResultType, isResultOfType} from "./typeguards";

export namespace Results {
    /**
     * Interface that represents a result object, maybe its a '**success**' or a '**failure**' one.
     * @template {any} TSuccess Output data type in case of '**success**'.
     * @template {any} TError Thrown error type in case of '**failure**'.
     */
    export type Type<
        TData = any,
        TError = any,
        TSuccess extends ISuccessResult<TData> = ISuccessResult<TData>,
        TFailure extends IFailureResult<TError> = IFailureResult<TError>,
    > = IResult<TData, TError, TSuccess, TFailure>;

    /**
     * Success result's type.
     */
    export type Success<
        TData = any,
        TSuccess extends ISuccessResult<TData> = ISuccessResult<TData>,
    > = TSuccess;

    /**
     * Failure result's type.
     */
    export type Failure<
        TError = any,
        TFailure extends IFailureResult<TError> = IFailureResult<TError>,
    > = TFailure;

    /**
     * Success result's class.
     */
    export const Success: typeof SuccessResult = SuccessResult;

    /**
     * Failure result's class.
     */
    export const Failure: typeof FailureResult = FailureResult;

    // Success

    export const isSuccess: typeof isSuccessResult = isSuccessResult;
    export const assertsSuccess: typeof assertsSuccessResult = assertsSuccessResult;

    // Failure

    export const isFailure: typeof isFailureResult = isFailureResult;
    export const assertsFailure: typeof assertsFailureResult = assertsFailureResult;

    // Types

    export const isOfType: typeof isResultOfType = isResultOfType;
    export const assertsType: typeof assertsResultType = assertsResultType;

    // Base

    export const isObject: typeof isResultBaseObject = isResultBaseObject;
    export const assertsObject: typeof assertsResultObject = assertsResultObject;
}
export default Results;
