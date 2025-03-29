import {isPromise} from "node:util/types";

export function isTypedPromise<
    T extends any | Promise<any>,
    TData extends Awaited<T> = Awaited<T>,
>(value: T): value is Exclude<T, TData> & Promise<TData> {
    return isPromise(value);
}
