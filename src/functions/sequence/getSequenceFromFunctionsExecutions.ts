import type {IResult} from "../../results";
import {executeSingleFunctionSync} from "../single";
import {extractSingleFunctionExecution} from "./extractSingleFunctionExecution";
import type {SequenceFunctionsExecutions, SequenceFunctionsFromExecutions} from "./types";

export function getSequenceFromFunctionsExecutions<
    T extends any[],
    TError = Error,
>(
    executions: T & SequenceFunctionsExecutions<T>
): SequenceFunctionsFromExecutions<T, TError> {
    const wrappedFunctions = [];

    for (const singleExecution of extractSingleFunctionExecution<T>(executions)) {
        if (wrappedFunctions.length === 0) {
            const [func, ...params] = singleExecution;
            wrappedFunctions.push(
                () => executeSingleFunctionSync<typeof func, TError>(func, ...params),
            );
        } else {
            const [func, ...params] = singleExecution;
            const lastFunction = wrappedFunctions[wrappedFunctions.length - 1] as (
                previousResult: IResult,
                ...args: any[]
            ) => any | Promise<any>;
            wrappedFunctions.push(
                (previousResult: Awaited<ReturnType<typeof lastFunction>>) => {
                    return executeSingleFunctionSync(func, previousResult, ...params);
                },
            );
        }
    }

    return wrappedFunctions as SequenceFunctionsFromExecutions<T, TError>;
}
