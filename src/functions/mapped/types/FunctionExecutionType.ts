import type {FunctionExecution} from "../../single";

export type FunctionExecutionType<
    TFunc extends (...args: TParams) => any,
    TParams extends any[] = Parameters<TFunc>,
> = FunctionExecution<TFunc, TParams>;
