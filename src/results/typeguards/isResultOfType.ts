import {isFailureResult} from "../failure";
import type {IResult} from "../IResult";
import {isSuccessResult} from "../success";

/**
 * Returns TRUE if {@link result|given result} is a result object of the {@link expectedType|given type}.\
 * Returns FALSE otherwise.
 *
 * This is a TypeGuard function and will infer success result object structure in case of TRUE.
 * @param result
 * @param expectedType
 */
export function isResultOfType(
    result: IResult,
    expectedType: IResult["type"],
): result is typeof result & { type: typeof expectedType } {
    switch (expectedType) {
        case "failure":
            return isFailureResult(result);
        case "success":
            return isSuccessResult(result);
    }
}
