import {isPromise} from "node:util/types";
import type {AwaitPromises, ExtractFunctions} from "../../multiple";
import {executeSequenceFunctionsSync} from "../sync";
import type {SequenceFunctionsExecutions, SequenceFunctionsResults} from "../types";

export async function executeSequenceFunctionsAsync<
    T extends any[],
    TError = Error,
>(
    ...sequence: T & SequenceFunctionsExecutions<T>
): Promise<AwaitPromises<SequenceFunctionsResults<ExtractFunctions<T>, TError>>> {
    const results: SequenceFunctionsResults<ExtractFunctions<T>, TError> = executeSequenceFunctionsSync(...sequence);
    if (results.some(result => isPromise(result))) {
        return await Promise.all(
            results.map(
                result => isPromise(result)
                    ? result
                    : Promise.resolve(result),
            )
        ) as AwaitPromises<SequenceFunctionsResults<ExtractFunctions<T>, TError>>;
    } else {
        return results as AwaitPromises<SequenceFunctionsResults<ExtractFunctions<T>, TError>>;
    }
}
