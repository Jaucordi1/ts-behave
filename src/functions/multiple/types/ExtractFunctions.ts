/**
 * Build a tuple only containing functions from given tuple
 */
export type ExtractFunctions<
    T extends any[]
> = T extends [] ? [] :
    T extends [infer TFirst, ...infer Rest]
        ? TFirst extends (...args: any[]) => any
            ? [TFirst, ...ExtractFunctions<Rest>]
            : ExtractFunctions<Rest>
        : never;
