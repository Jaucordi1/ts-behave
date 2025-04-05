import {executeSingleFunctionAsync} from "../../single";
import type {AwaitPromises, ExtractFunctions, FunctionsResults, ValidateFunctionsExecutions} from "../types";

export async function executeMultipleFunctionsAsync<
    T extends any[],
    TError = Error,
>(
    ...executions: T & ValidateFunctionsExecutions<T>
): Promise<AwaitPromises<FunctionsResults<ExtractFunctions<T>, TError>>> {
    const results = [];

    let i = 0;
    while (i < executions.length) {
        const func = executions[i] as T[typeof i];
        const paramsCount = func.length;
        const params = executions.slice(1 + i, 1 + i + paramsCount) as Parameters<typeof func>;
        const result = await executeSingleFunctionAsync<TError, typeof func>(func, ...params);
        results.push(result);
        i += 1 + paramsCount;
    }

    return results as AwaitPromises<FunctionsResults<ExtractFunctions<T>, TError>>;
}
