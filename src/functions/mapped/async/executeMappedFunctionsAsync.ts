import {executeSingleFunctionAsync} from "../../single";
import type {FunctionExecutionType} from "../types";
import type {MappedFunctionsAsyncResults} from "../types/MappedFunctionsAsyncResults";

export async function executeMappedFunctionsAsync<
    T extends Record<TName, TExecution>,
    TName extends string,
    TExecution extends FunctionExecutionType<TFunc, TParams>,
    TFunc extends (...args: TParams) => any,
    TParams extends any[],
    TError = Error,
>(
    functionsMapping: T
): MappedFunctionsAsyncResults<T, TFunc, TParams, TError> {
    let results = {};

    const entries = Object.entries(functionsMapping) as {
        [TName in keyof T]: [TName, T[TName]];
    }[keyof T][];

    entries.forEach(([name, execution]) => {
        if (Array.isArray(execution)) {
            const [func, ...params] = execution;
            if (params.length < func.length) {
                throw new Error(`Missing arguments for function call '${name as string}'`);
            }
            if (params.length > func.length) {
                throw new Error(`Too much arguments for function call '${name as string}'`);
            }
        } else {
            const func = execution as (...args: []) => any;
            if (func.length > 0) {
                throw new Error(`Missing parameters when calling function '${name as string}'`);
            }
        }
    });

    for (const [name, execution] of entries) {
        // tuple
        if (Array.isArray(execution)) {
            const [func, ...params] = execution;
            Object.assign(results, {
                [name]: await executeSingleFunctionAsync(func, ...(params as Parameters<TFunc>)),
            });
        } else {
            // no params func
            const func = execution as (...args: []) => any;
            Object.assign(results, {
                [name]: await executeSingleFunctionAsync(func),
            });
        }
    }

    return results as MappedFunctionsAsyncResults<T, TFunc, TParams, TError>;

    /*return Object.entries(functionsMapping).reduce(
        (results, [name, execution]) => {
            const [process, ...params] = execution;
            return Object.assign(results, {
                [name]: executeSingleFunctionSync(process, ...params),
            });
        },
        {} as MappedFunctionsResults<typeof functionsMapping, TError>,
    );*/
}
