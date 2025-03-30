import type {FunctionExecution} from "../../single";

/**
 * List of "function execution arguments".
 */
export type FunctionsExecutions<
    TFuncs extends TFunc[]
        = [],
    TFunc extends (...args: any[]) => any
        = TFuncs[number],
    TExecutions extends any[]
        = [],
> = TFuncs extends [] ? TExecutions :
    TFuncs extends [infer TFirst extends TFunc, ...infer Rest extends TFunc[]]
        ? FunctionsExecutions<
            Rest,
            Rest[number],
            [...TExecutions, FunctionExecution<TFirst>]
        >
        : never;
