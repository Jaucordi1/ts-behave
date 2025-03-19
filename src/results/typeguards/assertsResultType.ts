import {assertsFailureResult} from "../failure";
import type {IResult} from "../IResult";
import {assertsSuccessResult} from "../success";

/**
 * Asserts the {@link result|given result object} is of the {@link expectedType|given type}.
 *
 * This is a TypeGuard function and will infer {@link IResult|result object structure}
 * of the given type after the function execution.
 *
 * This is also an assertion function, it returns void and can throw an error.
 * @param result
 * @param expectedType
 */
export function assertsResultType(
    result: IResult,
    expectedType: IResult["type"],
): asserts result is typeof result & { type: typeof expectedType } {
    switch (expectedType) {
        case "failure":
            return assertsFailureResult(result);
        case "success":
            return assertsSuccessResult(result);
    }
}
