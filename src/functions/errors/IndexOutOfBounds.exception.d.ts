import type {TupleSize, TypeOfOfType} from "../../types";

/**
 * Given arguments are out of bounds from expected.
 * @template {any[]} TBounds The boundaries of expected arguments.
 * @template {any} TArg The argument out of bounds.
 * @template {number} TIndex The out of bound argument's index.
 */
export type IndexOutOfBoundsException<
    TBounds extends any[],
    TArg extends any,
    TIndex extends number,
    TBoundsSize extends TupleSize<TBounds>
        = TupleSize<TBounds>,
> = TBoundsSize extends 0
    ? `Unexpected '${TypeOfOfType<TArg>}' argument given at index ${TIndex}, requires no arguments`
    : `Unexpected '${TypeOfOfType<TArg>}' argument given at index ${TIndex}, requires only ${TBoundsSize} argument${TBoundsSize extends 1 ? "" : "s"}`;
