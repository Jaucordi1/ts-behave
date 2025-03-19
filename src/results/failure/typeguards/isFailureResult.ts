import type {IResult} from "../../IResult";
import {FailureResult} from "../FailureResult";
import type {IFailureResult} from "../IFailureResult";

/**
 * Returns TRUE if the {@link result|given result object} is a {@link IFailureResult|'**failure**' result object}.\
 * Returns FALSE otherwise.
 *
 * This is a TypeGuard function and will infer the {@link IFailureResult|'**failure**' result object structure} in case
 * of TRUE.
 * @template {any} TError
 * @template {any} TOutput
 * @param result {@link result|Result object} to check for '**failure**'.
 * @returns {boolean}
 */
export function isFailureResult<TError extends any, TOutput extends any>(
    result: IResult<TOutput, TError>,
): result is typeof result & IFailureResult<TError> {
    if (result instanceof FailureResult) {
        return true;
    }
    if (!("type" in result) || result.type !== "failure") {
        return false;
    }
    return "error" in result;
}
