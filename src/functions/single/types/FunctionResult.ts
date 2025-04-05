import type {IFailureResult, ISuccessResult} from "../../../results";
import type {PromiseIfAsync} from "../../types";
import type {FunctionOutput} from "./FunctionOutput";

/**
 * Result object for the given synchronous function.
 */
export type SyncFunctionResult<
    TFunc extends (...args: any[]) => any,
    TError,
    TData extends FunctionOutput<TFunc> = FunctionOutput<TFunc>,
    TSuccess extends ISuccessResult<TData> = ISuccessResult<TData>,
    TFailure extends IFailureResult<TError> = IFailureResult<TError>,
> = PromiseIfAsync<
    | TSuccess
    | TFailure,
    TFunc
>;

/**
 * Result object for the given asynchronous function.
 */
export type AsyncFunctionResult<
    TFunc extends (...args: any[]) => any,
    TError,
    TData extends FunctionOutput<TFunc> = FunctionOutput<TFunc>,
    TSuccess extends ISuccessResult<TData> = ISuccessResult<TData>,
    TFailure extends IFailureResult<TError> = IFailureResult<TError>,
> = | TSuccess
    | TFailure;
