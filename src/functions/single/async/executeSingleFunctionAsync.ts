import {FailureResult, SuccessResult} from "../../../results";
import type {AsyncFunctionResult} from "../types";

/**
 * Execute a single given function with its parameters and return a corresponding result object.
 * @param func
 * @param args
 */
export async function executeSingleFunctionAsync<
    TError,
    TFunc extends (...args: any[]) => Promise<any>,
>(
    func: TFunc,
    ...args: Parameters<TFunc>
): Promise<AsyncFunctionResult<TFunc, TError>> {
    try {
        const output = await func(...args);
        return new SuccessResult(output);
    } catch (error: any) {
        return new FailureResult<TError>(error);
    }
}
