import {FailureResult, SuccessResult} from "../../../results";
import type {SyncFunctionOutput, SyncFunctionResult} from "../types";

/**
 * Execute a single given function with its parameters and return a corresponding result object.
 * @param func
 * @param args
 */
export function executeSingleFunctionSync<
    TError,
    TFunc extends (...args: any[]) => Exclude<ReturnType<TFunc>, Promise<any>>,
>(
    func: TFunc,
    ...args: Parameters<TFunc>
): SyncFunctionResult<TFunc, TError> {
    try {
        const output = func(...args);
        return new SuccessResult(output as SyncFunctionOutput<TFunc>);
    } catch (error: any) {
        return new FailureResult<TError>(error);
    }
}
