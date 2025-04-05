export function* extractEachFunctionsExecution(args: any[]) {
    let i = 0;
    while (i < args.length) {
        const func = args[i];
        const argsCount = func.length;
        const execution = args.slice(
            i,
            i + 1 + argsCount,
        );
        i += 1 + argsCount;
        yield execution;
    }
}
