import {executeSingleFunctionAsync} from "../../single";
import type {
    AwaitPromises,
    ExtractFunctions,
    FunctionsOutputs,
    MakeResultsTuple,
    ValidateFunctionsExecutions,
} from "../types";

export async function executeMultipleFunctionsAsync<
    T extends any[],
    TError = Error,
    TFuncs extends TFunc[] = ExtractFunctions<T>,
    TFunc extends (...args: any[]) => Promise<TData> = TFuncs[number],
    TData extends any = FunctionsOutputs<TFuncs>[number],
>(
    ...executions: T & ValidateFunctionsExecutions<T>
): Promise<MakeResultsTuple<AwaitPromises<FunctionsOutputs<TFuncs>>, TError>> {
    const results = [];

    let i = 0;
    while (i < executions.length) {
        const func = executions[i] as TFunc;
        const paramsCount = func.length;
        const params = executions.slice(1 + i, 1 + i + paramsCount) as Parameters<typeof func>;
        const result = await executeSingleFunctionAsync<TError, typeof func>(func, ...params);
        results.push(result);
        i += 1 + paramsCount;
    }

    return results as MakeResultsTuple<AwaitPromises<FunctionsOutputs<TFuncs>>, TError>;
}
