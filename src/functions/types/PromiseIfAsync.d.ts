export type PromiseIfAsync<
    PromiseThis extends any,
    IfThisAsync extends (...args: any) => TOutput = (...args: any) => any | Promise<any>,
    TOutput extends any = ReturnType<IfThisAsync>,
> = TOutput extends PromiseLike<any>
    ? Promise<PromiseThis>
    : PromiseThis;
