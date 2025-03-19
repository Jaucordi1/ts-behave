import {assertsFailureResult, FailureResult, type IFailureResult, isFailureResult} from "./failure";
import type {IResult} from "./IResult";
import {assertsSuccessResult, isSuccessResult, type ISuccessResult, SuccessResult} from "./success";
import {assertsResultType, isResultOfType} from "./typeguards";

export namespace Results {
    export type Interface<
        TSuccess extends any = any,
        TError extends any = any,
    > = IResult<TSuccess, TError>;

    /*export type FromFunction<
        TFunc extends (...args: any[]) => any,
        TErrorData extends any = any,
    > = IResult<Awaited<ReturnType<TFunc>>, TErrorData>;*/

    export type Success<
        TSuccessData extends any = any,
    > = ISuccessResult<TSuccessData>;

    export type Failure<
        TErrorData extends any = any,
    > = IFailureResult<TErrorData>;

    // Classes
    export const Success: typeof SuccessResult = SuccessResult;
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
}
export default Results;
