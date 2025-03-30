/**
 * Output data of the given synchronous function, never for asynchronous ones.
 */
export type SyncFunctionOutput<
    TFunc extends (...args: any[]) => any
> = TFunc extends (...args: any[]) => infer TReturned
    ? TReturned
    : never;

/**
 * Output data of the given asynchronous function, never for synchronous ones.
 */
export type AsyncFunctionOutput<
    TFunc extends (...args: any[]) => any,
> = TFunc extends (...args: any[]) => Promise<infer TData> | infer TData
    ? TData
    : never;

/**
 * Output data of the given function, awaited output for asynchronous functions.
 */
export type FunctionOutput<
    TFunc extends (...args: any[]) => any
> = TFunc extends (...args: any[]) => Promise<any>
    ? AsyncFunctionOutput<TFunc>
    : SyncFunctionOutput<TFunc>;
