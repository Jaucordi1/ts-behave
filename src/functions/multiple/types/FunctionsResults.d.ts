import type {FunctionsOutputs} from "./FunctionsOutputs";
import type {MakeResultsTuple} from "./MakeResultsTuple";

/**
 * Tuple of given functions tuple's result objects.
 */
export type FunctionsResults<
    T extends ((...args: any[]) => TData)[],
    TError = Error,
    TOutputs extends FunctionsOutputs<T> = FunctionsOutputs<T>,
    TData = TOutputs[number],
    TResults extends any[]
        = [],
> = T extends [] ? TResults :
    T extends [infer TFunc]
        ? FunctionsOutputs<T> extends [...infer TOutputs]
            ? MakeResultsTuple<TOutputs, TError>
            : never
        : never;
