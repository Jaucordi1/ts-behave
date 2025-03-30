import type {UnionToIntersection} from "../../../types";
import type {SyncFunctionResult} from "../../single";
import type {FunctionExecutionType} from "./FunctionExecutionType";
import type {Remap} from "./Remap";

export type MappedFunctionsSyncResults<
    T extends Record<string, FunctionExecutionType<TFunc, TParams>>,
    TFunc extends (...args: TParams) => any,
    TParams extends any[] = Parameters<TFunc>,
    TError = Error,
> = Remap<
    UnionToIntersection<
        Exclude<
            {
                [Name in keyof T]: T[Name] extends FunctionExecutionType<infer Func extends TFunc>
                ? Record<
                    Name,
                    SyncFunctionResult<Func, TError>
                >
                : never;
            }[keyof T],
            undefined
        >
    >
>;
