import {executeMappedFunctionsAsync, executeMappedFunctionsSync} from "./mapped";
import {executeMultipleFunctionsAsync, executeMultipleFunctionsSync} from "./multiple";
import {executeSequenceFunctionsSync} from "./sequence";
import {executeSequenceFunctionsAsync} from "./sequence/async";
import {
    type AsyncFunctionResult,
    executeSingleFunctionAsync,
    executeSingleFunctionSync,
    type SyncFunctionResult,
} from "./single";

export namespace Functions {
    export namespace Result {
        /**
         * Result object after executing the given synchronous function.
         */
        export type Sync<
            TFunc extends (...args: any[]) => TData,
            TError = Error,
            TData = Exclude<ReturnType<TFunc>, Promise<any>>,
        > = SyncFunctionResult<TFunc, TError>;

        /**
         * Result object after executing the given asynchronous function.
         */
        export type Async<
            TFunc extends (...args: any[]) => Promise<any>,
            TError = Error
        > = AsyncFunctionResult<TFunc, TError>;

        /**
         * Result object after executing the given function.
         */
        export type Type<
            TFunc extends (...args: any[]) => any,
            TError = Error
        > = AsyncFunctionResult<TFunc, TError>;
    }

    export namespace Single {
        export const executeAsync: typeof executeSingleFunctionAsync = executeSingleFunctionAsync;
        export const executeSync: typeof executeSingleFunctionSync = executeSingleFunctionSync;
    }

    export namespace Multiple {
        export const executeAsync: typeof executeMultipleFunctionsAsync = executeMultipleFunctionsAsync;
        export const executeSync: typeof executeMultipleFunctionsSync = executeMultipleFunctionsSync;
    }

    export namespace Mapped {
        export const executeAsync: typeof executeMappedFunctionsAsync = executeMappedFunctionsAsync;
        export const executeSync: typeof executeMappedFunctionsSync = executeMappedFunctionsSync;
    }

    export namespace Sequence {
        export const executeAsync: typeof executeSequenceFunctionsAsync = executeSequenceFunctionsAsync;
        export const executeSync: typeof executeSequenceFunctionsSync = executeSequenceFunctionsSync;
    }
}
export default Functions;
