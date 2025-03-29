import type {FunctionExecution} from "../single";

export function* extractFirstFunctionExecution<T extends any[]>(
    ...args: T
): Generator<FunctionExecution<T[0]>> {
    const func = args[0] as T[0];
    const argsCount = func.length;
    const funcArgs = args.splice(1, 1 + argsCount) as FunctionExecution<T[0]>;
    return [func, ...funcArgs] as const;
}
