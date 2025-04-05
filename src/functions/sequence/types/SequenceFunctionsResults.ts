import type {GetLastListItem} from "../../../types";
import type {AsyncFunctionResult, SyncFunctionResult} from "../../single";
import type {HasPromise} from "../../types";

export type SequenceFunctionsResults<
    TFunctions extends ((...args: any[]) => any)[],
    TError,
    TResults extends any[]
        = [],
> = TFunctions extends [] ? TResults :
    TFunctions extends [infer TFunc extends TFunctions[number], ...infer Rest extends TFunctions[number][]]
        /*? SequenceFunctionsResults<
            Rest,
            TError,
            [...TResults, SyncFunctionResult<TFunc, TError>]
        >*/
        ? HasPromise<[ReturnType<TFunc>, GetLastListItem<TResults>]> extends true
            // ASYNC
            ? SequenceFunctionsResults<
                Rest,
                TError,
                [...TResults, SyncFunctionResult<TFunc, TError>]
            >
            // SYNC
            : SequenceFunctionsResults<
                Rest,
                TError,
                [...TResults, AsyncFunctionResult<TFunc, TError>]
            >
        : never;
