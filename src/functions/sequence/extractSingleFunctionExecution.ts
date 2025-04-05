import type {FunctionExecution} from "../single";
import type {SequenceFunctionsExecutions} from "./types";

export function* extractSingleFunctionExecution<T extends any[]>(
    args: T & SequenceFunctionsExecutions<T>
) {
    let i = 0;
    while (i < args.length) {
        const func = args[i];
        const argsCount = func.length;
        const funcArgs = args.slice(
            i + 1,
            i + 1 + argsCount,
        ) as FunctionExecution<typeof func>;
        i += argsCount + 1;
        yield [
            func,
            ...funcArgs,
        ] as const;
    }
}
