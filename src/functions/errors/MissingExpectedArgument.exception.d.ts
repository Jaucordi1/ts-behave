import type {TypeOfOfType} from "../../types";

/**
 * An expected argument is missing at given index.
 * @template {any} TExpectedArg
 * @template {number} TIndex
 */
export type MissingExpectedArgumentException<
    TExpectedArg extends any,
    TIndex extends number,
> = `Missing expected '${TypeOfOfType<TExpectedArg>}' argument at index ${TIndex}`;
