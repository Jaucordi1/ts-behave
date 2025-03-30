import type {IFailureResult, ISuccessResult} from "../../../results";
import type {PromiseIfAsync} from "../../types";
import type {AsyncFunctionOutput, FunctionOutput} from "./FunctionOutput";

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
    TFunc extends (...args: any[]) => Promise<TData>,
    TError,
    TData = AsyncFunctionOutput<TFunc>,
    TSuccess extends ISuccessResult<TData> = ISuccessResult<TData>,
    TFailure extends IFailureResult<TError> = IFailureResult<TError>,
> = | TSuccess
    | TFailure;

/**
 * Result object for the given function.
 */
export type FunctionResult<
    TFunc extends (...args: any[]) => any,
    TError,
    TData extends FunctionOutput<TFunc> = FunctionOutput<TFunc>,
    TSuccess extends ISuccessResult<TData> = ISuccessResult<TData>,
    TFailure extends IFailureResult<TError> = IFailureResult<TError>,
> = TFunc extends (...args: any[]) => Promise<TData>
    ? AsyncFunctionResult<TFunc, TError, TData, TSuccess, TFailure>
    : SyncFunctionResult<TFunc, TError, TData, TSuccess, TFailure>;
