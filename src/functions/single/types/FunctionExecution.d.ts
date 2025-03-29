/**
 * Represents the required ordered arguments (including the function) to execute the given function.
 */
export type FunctionExecution<
    TFunc extends (...args: TParams) => any,
    TParams extends any[] = Parameters<TFunc>,
> = [TFunc, ...TParams];
