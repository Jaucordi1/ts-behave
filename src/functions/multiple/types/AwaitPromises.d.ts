/**
 * Build a tuple of awaited elements in the given tuple.
 */
export type AwaitPromises<T extends any[]> =
    T extends [] ? [] :
        T extends [infer TFirst, ...infer Rest]
            ? [Awaited<TFirst>, ...AwaitPromises<Rest>]
            : never;
