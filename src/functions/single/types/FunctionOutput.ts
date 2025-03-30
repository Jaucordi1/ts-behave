/**
 * Output data of the given synchronous function, never for asynchronous ones.
 */
export type SyncFunctionOutput<T extends (...args: any[]) => any> =
    T extends (...args: any[]) => infer TReturned | Promise<infer TReturned>
        ? TReturned
        : never;

/**
 * Output data of the given asynchronous function, never for synchronous ones.
 */
export type AsyncFunctionOutput<T> =
    T extends (...args: any[]) => Promise<infer TOutput>
        ? TOutput
        : never;

/**
 * Output data of the given function, awaited output for asynchronous functions.
 */
export type FunctionOutput<T extends (...args: any[]) => any> =
    T extends (...args: any[]) => Promise<any>
        ? AsyncFunctionOutput<T>
        : SyncFunctionOutput<T>;
