import type {IResult} from "../../../results";
import type {GetLastListItem} from "../../../types";
import type {FunctionOutput} from "../../single";
import type {PromiseIfPromise} from "../../types";

export type SequenceFunctionsFromResults<
    TResults extends (IResult | Promise<IResult>)[],
    TAcc extends ((...args: any[]) => IResult | Promise<IResult>)[]
        = [],
> = TResults extends [] ? TAcc :
    TResults extends [infer TResult extends TResults[number], ...infer Rest extends TResults[number][]]
        ? TAcc extends []
            // First given function (no previous result)
            ? SequenceFunctionsFromResults<
                Rest,
                [...TAcc, () => PromiseIfPromise<Awaited<TResult>, TResult>]
            >
            // Next given functions (requires previous result)
            : SequenceFunctionsFromResults<
                Rest,
                [
                    ...TAcc,
                    (previousResult: FunctionOutput<GetLastListItem<TAcc>>) => PromiseIfPromise<Awaited<TResult>, TResult>,
                ]
            >
        : never;
