import type {ISuccessResult} from "../ISuccessResult";
import type {IResult} from "../../IResult";
import {WrongResultTypeError} from "../../typeguards";
import {isSuccessResult} from "./isSuccessResult";

/**
 * Asserts the {@link result|given result object} is a {@link ISuccessResult|'**success**' result object}.
 *
 * This is a TypeGuard function and will infer
 * {@link ISuccessResult|'**success**' result object structure} after the function execution.
 *
 * This is also an assertion function, it returns void and can throw an error.
 * @template {any} TOutput
 * @template {any} TError
 * @param result
 * @throws {WrongResultTypeError} If the '**type**' key contains anything else than '**success**'.
 */
export function assertsSuccessResult<TOutput, TError>(
    result: IResult<TOutput, TError>,
): asserts result is typeof result & ISuccessResult<TOutput> {
    if (!isSuccessResult(result)) {
        throw new WrongResultTypeError("success", result);
    }
}
