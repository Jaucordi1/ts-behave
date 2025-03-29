import type {RemoveFirstListItem} from "../../../types";
import type {SyncFunctionOutput} from "../../single";

/**
 * Tuple of given functions tuple's outputs.
 */
export type FunctionsOutputs<
    T extends any[],
    TOutputs extends any[]
        = [],
> = T extends [] ? TOutputs :
    SyncFunctionOutput<T[0]> extends infer TOutput
        ? FunctionsOutputs<RemoveFirstListItem<T>, [...TOutputs, TOutput]>
        : never;
