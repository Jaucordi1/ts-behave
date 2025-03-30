import type {TupleSizeWithOffset} from "../types";
import type {
    IncompatibleArgumentErrorMessage,
    IndexOutOfBoundsErrorMessage,
    MissingExpectedArgumentErrorMessage,
} from "./errors";

/**
 * Use recursion to validate given args among expected ones.
 * Returns the validated arguments if given ones are valid.
 * Returns a string error when validation fails.
 */
export type TupleExtendsExpected<
    TExpectedTuple extends any[],
    TTuple extends any[],
    TOffset extends any[]
        = [],
    TValidTuple extends any[]
        = [],
> = TExpectedTuple extends []
    // Expected elements to validate : NO
    ? TTuple extends []
        // Given elements to validate : none, we're all good!
        ? TValidTuple
        // No more arguments expected but received some, error index out of bounds
        : IndexOutOfBoundsErrorMessage<
            [...TValidTuple, ...TExpectedTuple],
            TTuple[0],
            TupleSizeWithOffset<TValidTuple, TOffset>
        >
    // Expected elements to validate : YES
    : TExpectedTuple extends [infer TFirstExpected, ...infer TRestExpected]
        // Extracted first element in expected tuple
        ? TTuple extends [infer TFirstGiven, ...infer TRestGiven]
            // Extracted first element in given tuple
            ? TFirstGiven extends TFirstExpected
                // First given element extends first expected one.
                // Add given one to valid ones and continue through remaining tuples
                ? TupleExtendsExpected<TRestExpected, TRestGiven, TOffset, [...TValidTuple, TFirstGiven]>
                // First given element doesn't extends first expected one, error incompatible argument
                : IncompatibleArgumentErrorMessage<
                    TFirstExpected,
                    TFirstGiven,
                    TValidTuple,
                    TOffset
                >
            // No elements in given tuple, error missing expected argument
            : MissingExpectedArgumentErrorMessage<
                TFirstExpected,
                TupleSizeWithOffset<TValidTuple, TOffset>
            >
        // No elements in expected tuple, error index out of bounds
        : TOffset["length"] extends 0
            ? IndexOutOfBoundsErrorMessage<
                [...TValidTuple, ...TExpectedTuple],
                TTuple[0],
                TupleSizeWithOffset<TValidTuple, TOffset>
            >
            : IndexOutOfBoundsErrorMessage<
                [...TValidTuple, ...TExpectedTuple],
                TTuple[0],
                TupleSizeWithOffset<TValidTuple, TOffset>
            >;

/**
 * Shortcut type to validate given arguments among expected ones.
 */
export type ValidateCompatibleArguments<
    TExpectedArgs extends any[],
    TArgs extends any[],
    TOffset extends any[]
        = [],
    TError extends TupleExtendsExpected<TExpectedArgs, TArgs, TOffset>
        = TupleExtendsExpected<TExpectedArgs, TArgs, TOffset>,
> = [TError] extends [TArgs] ? TArgs : TError;
