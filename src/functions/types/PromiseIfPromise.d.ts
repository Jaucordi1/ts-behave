export type PromiseIfPromise<
    PromiseThis extends any,
    IfThisIsPromise extends any,
> = IfThisIsPromise extends PromiseLike<any>
    ? Promise<PromiseThis>
    : PromiseThis;
