import {FailureResult, SuccessResult} from "../../../results";
import {isTypedPromise} from "../../../types";
import type {FunctionOutput, SyncFunctionResult} from "../types";

/**
 * Execute a single given function with its parameters and return a corresponding result object.
 * @param func
 * @param args
 */
export function executeSingleFunctionSync<
    TFunc extends (...args: any[]) => any,
    TError = Error,
    TData extends FunctionOutput<TFunc> = FunctionOutput<TFunc>,
>(
    func: TFunc,
    ...args: Parameters<TFunc>
): SyncFunctionResult<TFunc, TError, TData> {
    try {
        const returned = func(...args);
        if (isTypedPromise<ReturnType<TFunc>>(returned)) {
            return returned
                .then((output: TData) => new SuccessResult(output))
                .catch((error: TError) => new FailureResult(error));
        } else {
            return new SuccessResult(returned) as SyncFunctionResult<TFunc, TError, TData>;
        }
    } catch (error: any) {
        return new FailureResult<TError>(error) as SyncFunctionResult<TFunc, TError, TData>;
    }
}
