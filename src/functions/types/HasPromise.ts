export type HasPromise<T extends any[]> =
    T extends never[] ? false :
    T extends [] ? false :
    T extends [infer TFirst, ...infer Rest]
        ? TFirst extends PromiseLike<any>
            ? true
            : HasPromise<Rest>
        : never;
