import type {IResult} from "../../IResult";
import type {ISuccessResult} from "../ISuccessResult";
import {SuccessResult} from "../SuccessResult";

/**
 * Returns TRUE if the {@link result|given result object} is a {@link ISuccessResult|'**success**' result object}.\
 * Returns FALSE otherwise.
 *
 * This is a TypeGuard function and will infer the {@link ISuccessResult|'**success**' result object structure} in case of TRUE.
 * @template {any} TOutput
 * @template {any} TError
 * @param result {@link result|Result object} to check for '**success**'.
 * @returns {boolean}
 */
export function isSuccessResult<TOutput extends any, TError extends any>(
    result: IResult<TOutput, TError>,
): result is typeof result & ISuccessResult<TOutput> {
    if (result instanceof SuccessResult) {
        return true;
    }
    if (!("type" in result) || result.type !== "success") {
        return false;
    }
    return "data" in result;
}
