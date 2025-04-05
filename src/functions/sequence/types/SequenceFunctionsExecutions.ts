import type {IResult} from "../../../results";
import type {GetLastListItem} from "../../../types";
import type {MissingFunctionToExecuteErrorMessage} from "../../errors";

export type SequenceFunctionsExecutions<
    T extends any[],
    TAcc extends any[]
        = T,
    TValid extends any[]
        = [],
    TResults extends any[]
        = [],
> = T extends [] ? MissingFunctionToExecuteErrorMessage :
    TValid extends T ? T :
        TAcc extends [] ? "Finish validating arguments, some are invalid." :
            TAcc extends [infer TFunc, ...infer Rest]
                ? TFunc extends (...args: infer TFuncArgs) => infer TReturned
                    ? [GetLastListItem<TResults>] extends [never]
                        ? Rest extends [...TFuncArgs, ...infer Next]
                            ? SequenceFunctionsExecutions<
                                T,
                                Next,
                                [...TValid, TFunc, ...TFuncArgs],
                                [...TResults, IResult<Awaited<TReturned>>]
                            >
                            : "Missing last function's arguments"
                        : TFuncArgs extends [
                                infer TPrevResult extends GetLastListItem<TResults>,
                                ...infer TExpectedArgs
                            ]
                            ? Rest extends [...TExpectedArgs, ...infer Next]
                                ? SequenceFunctionsExecutions<
                                    T,
                                    Next,
                                    [...TValid, TFunc, ...TExpectedArgs],
                                    [...TResults, IResult<Awaited<TReturned>>]
                                >
                                : "Missing last function's arguments"
                            : "First argument of your last function must be a result object of the previous one."
                    : never
                : never;
