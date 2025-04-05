import type {AsyncFunctionResult, SyncFunctionResult} from "../../single";
import type {HasPromise} from "../../types";

/**
 * Tuple of given functions tuple's result objects.
 */
export type FunctionsResults<
    TFunctions extends ((...args: any[]) => any)[],
    TError,
    TResults extends any[]
        = [],
> = TFunctions extends [] ? TResults :
    TFunctions extends [infer TFunc extends TFunctions[number], ...infer Rest extends TFunctions[number][]]
        ? HasPromise<[ReturnType<TFunc>]> extends true
            // ASYNC
            ? FunctionsResults<
                Rest,
                TError,
                [...TResults, SyncFunctionResult<TFunc, TError>]
            >
            // SYNC
            : FunctionsResults<
                Rest,
                TError,
                [...TResults, AsyncFunctionResult<TFunc, TError>]
            >
        : never;
