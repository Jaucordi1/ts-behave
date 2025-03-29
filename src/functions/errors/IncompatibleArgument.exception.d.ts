import type {GetTypeOf, TuplePlacementNumber, TypeOfOfType} from "../../types";

/**
 * Incompatible types between given argument and expected one.
 * @template {any} TExpectedArg
 * @template {any} TArg
 * @template {number} TIndex
 */
export type IncompatibleArgumentException<
    TExpectedArg extends any,
    TArg extends any,
    TValidArgs extends any[],
    TOffset extends any[]
        = [],
    TIndex extends number
        = [...TOffset, ...TValidArgs]["length"],
    TArgNum extends Capitalize<TuplePlacementNumber<TValidArgs["length"]>>
        = Capitalize<TuplePlacementNumber<TValidArgs["length"]>>,
> = GetTypeOf<TArg> extends GetTypeOf<TExpectedArg>
    ? `${TArgNum} given '${TypeOfOfType<TArg>}' argument at index ${TIndex} does not fulfill 'specific ${TypeOfOfType<TExpectedArg>}' requirements`
    : `${TArgNum} given '${TypeOfOfType<TArg>}' argument at index ${TIndex} must be a '${TypeOfOfType<TExpectedArg>}'`;
