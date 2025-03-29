import type {IFailureResult, IResult, ISuccessResult} from "../../../results";

export type InferResultType<
    TResult extends IResult<TData, TError, TSuccess, TFailure>,
    TData
        = TResult extends ISuccessResult<infer TData> ? TData : never,
    TError
        = TResult extends IFailureResult<infer TError> ? TError : never,
    TSuccess extends ISuccessResult<TData>
        = TResult extends infer TResult extends ISuccessResult<TData> ? TResult : never,
    TFailure extends IFailureResult<TError>
        = TResult extends infer TResult extends IFailureResult<TError> ? TResult : never,
> = | TSuccess
    | TFailure;

export type MakeResultsTuple<
    T extends any[],
    TError,
    TResults extends any[]
        = [],
> = T extends [] ? TResults :
    T extends [infer First, ...infer Rest]
        ? First extends PromiseLike<infer TOutput>
            // ASYNC
            ? MakeResultsTuple<
                Rest,
                TError,
                [...TResults, Promise<InferResultType<IResult<TOutput, TError>>>]
            >
            // SYNC
            : MakeResultsTuple<
                Rest,
                TError,
                [...TResults, InferResultType<IResult<First, TError>>]
            >
        : never;
