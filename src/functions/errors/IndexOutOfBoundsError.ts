import {getTypeOf, type TupleSize, type TypeOfOfType} from "../../types";

export type IndexOutOfBoundsErrorMessage<
    TBounds extends any[],
    TArg extends any,
    TIndex extends number,
    TBoundsSize extends TupleSize<TBounds>
        = TupleSize<TBounds>,
> = TBoundsSize extends 0
    ? `Unexpected '${TypeOfOfType<TArg>}' argument given at index ${TIndex}, requires no arguments`
    : `Unexpected '${TypeOfOfType<TArg>}' argument given at index ${TIndex}, requires only ${TBoundsSize} argument${TBoundsSize extends 1 ? "" : "s"}`;

/**
 * Given arguments are out of bounds from expected.
 * @template {any[]} TBounds The boundaries of expected arguments.
 * @template {any} TArg The argument out of bounds.
 * @template {number} TIndex The out of bound argument's index.
 */
export class IndexOutOfBoundsError<
    TBounds extends any[],
    TArg extends any,
    TIndex extends number,
    TBoundsSize extends TupleSize<TBounds>
        = TupleSize<TBounds>,
> extends Error {
    constructor(
        bounds: TBoundsSize,
        givenArg: TArg,
        givenArgIndex: TIndex,
        message?: IndexOutOfBoundsErrorMessage<TBounds, TArg, TIndex, TBoundsSize>,
    ) {
        if (!message) {
            if (bounds === 0) {
                message = (
                    `Unexpected '${getTypeOf(givenArg)}' argument given at index ${givenArgIndex}, requires no arguments`
                ) as IndexOutOfBoundsErrorMessage<TBounds, TArg, TIndex, TBoundsSize>;
            } else {
                message = (
                    `Unexpected '${getTypeOf(givenArg)}' argument given at index ${givenArgIndex}, requires only ${bounds} argument${bounds === 1 ? "" : "s"}`
                ) as IndexOutOfBoundsErrorMessage<TBounds, TArg, TIndex, TBoundsSize>;
            }
        }
        super(message);
    }
}
