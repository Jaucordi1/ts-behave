import type {UnionToIntersection} from "../../../types";
import type {AsyncFunctionResult} from "../../single";
import type {FunctionExecutionType} from "./FunctionExecutionType";
import type {Remap} from "./Remap";

export type MappedFunctionsAsyncResults<
    T extends Record<string, FunctionExecutionType<TFunc, TParams>>,
    TFunc extends (...args: TParams) => any,
    TParams extends any[] = Parameters<TFunc>,
    TError = Error,
> = Promise<
    Remap<
        UnionToIntersection<
            Exclude<
                {
                    [Name in keyof T]: T[Name] extends FunctionExecutionType<infer Func extends TFunc>
                    ? Record<
                        Name,
                        AsyncFunctionResult<Func, TError>
                    >
                    : never;
                }[keyof T],
                undefined
            >
        >
    >
>;
