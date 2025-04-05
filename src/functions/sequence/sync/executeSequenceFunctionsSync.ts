import type {IResult} from "../../../results";
import {isTypedPromise} from "../../../types";
import type {ExtractFunctions} from "../../multiple";
import {getSequenceFromFunctionsExecutions} from "../getSequenceFromFunctionsExecutions";
import type {SequenceFunctionsExecutions, SequenceFunctionsResults} from "../types";

export function executeSequenceFunctionsSync<
    T extends any[],
    TError = Error,
>(
    ...executions: T & SequenceFunctionsExecutions<T>
): SequenceFunctionsResults<ExtractFunctions<T>, TError> {
    const sequence: any[] = getSequenceFromFunctionsExecutions<T, TError>(executions);
    return sequence.reduce(
        (acc, func, i) => {
            if (i === 0) {
                return [func()];
            } else {
                const lastOutput = acc[acc.length - 1] as IResult | Promise<IResult>;
                if (isTypedPromise(lastOutput)) {
                    return [...acc, lastOutput.then(func)];
                } else {
                    return [...acc, func(lastOutput)];
                }
            }
        },
        [] as SequenceFunctionsResults<ExtractFunctions<T>, TError>,
    );
}
