import {executeSingleFunctionSync} from "../../single";
import type {FunctionExecutionType, MappedFunctionsSyncResults} from "../types";

export function executeMappedFunctionsSync<
    T extends Record<TName, TExecution>,
    TName extends string,
    TExecution extends FunctionExecutionType<TFunc, TParams>,
    TFunc extends (...args: TParams) => any,
    TParams extends any[],
    TError = Error,
>(
    functionsMapping: T,
): MappedFunctionsSyncResults<T, TFunc, TParams, TError> {
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
                [name]: executeSingleFunctionSync(func, ...(params as Parameters<TFunc>)),
            });
        } else {
            // no params func
            const func = execution as (...args: []) => any;
            Object.assign(results, {
                [name]: executeSingleFunctionSync(func),
            });
        }
    }

    return results as MappedFunctionsSyncResults<T, TFunc, TParams, TError>;
}
