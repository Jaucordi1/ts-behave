import {executeSingleFunctionSync, type FunctionExecution, type FunctionOutput} from "../../single";
import {extractEachFunctionsExecution} from "../extractEachFunctionsExecution";
import type {ExtractFunctions, FunctionsOutputs, MakeResultsTuple, ValidateFunctionsExecutions} from "../types";

export function executeMultipleFunctionsSync<
    T extends any[],
    TError = Error,
    TFuncs extends TFunc[] = ExtractFunctions<T>,
    TFunc extends (...args: any[]) => TData = TFuncs[number],
    TData extends any = FunctionOutput<TFunc>,
>(
    ...executions: T & ValidateFunctionsExecutions<T>
): MakeResultsTuple<FunctionsOutputs<ExtractFunctions<T>>, TError> {
    const wrappedFunctions = [];

    for (const singleExecution of extractEachFunctionsExecution(executions)) {
        const [func, ...params] = singleExecution as FunctionExecution<ExtractFunctions<T>[number]>;
        wrappedFunctions.push(executeSingleFunctionSync(func, ...params));
    }

    return wrappedFunctions as MakeResultsTuple<FunctionsOutputs<ExtractFunctions<T>>, Error>;
}
