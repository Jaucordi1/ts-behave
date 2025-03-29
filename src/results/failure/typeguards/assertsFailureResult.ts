import {UnexpectedResultTypeError} from "../../errors";
import type {IResult} from "../../IResult";
import type {IFailureResult} from "../IFailureResult";
import {isFailureResult} from "./isFailureResult";

/**
 * Asserts the {@link result|given result object} is a {@link IFailureResult|'**failure**' result object}.
 *
 * This is a TypeGuard function and will infer
 * {@link IFailureResult|'**failure**' result object structure} after the function execution.
 *
 * This is also an assertion function, it returns void and can throw an error.
 * @template {any} TError The given result execution's possible error thrown.
 * @template {any} TOutput The given result execution's possible data output data.
 * @param result The result object to asserts the '**failure**' of.
 * @throws {UnexpectedResultTypeError} If the '**type**' key contains anything else than '**failure**'.
 */
export function assertsFailureResult<TError, TOutput>(
    result: IResult<TOutput, TError>,
): asserts result is typeof result & IFailureResult<TError> {
    if (!isFailureResult(result)) {
        throw new UnexpectedResultTypeError("failure", result);
    }
}
