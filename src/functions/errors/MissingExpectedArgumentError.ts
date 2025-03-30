import type {TypeOfOfType} from "../../types";

export type MissingExpectedArgumentErrorMessage<
    TExpectedArg extends any,
    TIndex extends number,
> = `Missing expected '${TypeOfOfType<TExpectedArg>}' argument at index ${TIndex}`;

/**
 * An expected argument is missing at given index.
 * @template {any} TExpectedArg
 * @template {number} TIndex
 */
export class MissingExpectedArgumentError<
    TExpectedArg extends any,
    TIndex extends number,
> extends Error {
    constructor(
        expectedArgType: TypeOfOfType<TExpectedArg>,
        argIndex: TIndex,
        message: MissingExpectedArgumentErrorMessage<TExpectedArg, TIndex>
            = `Missing expected '${expectedArgType}' argument at index ${argIndex}`,
    ) {
        super(message);
    }
}
