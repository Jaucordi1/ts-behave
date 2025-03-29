import type {IResultBase} from "../IResultBase";
import {ResultBase} from "../ResultBase";
import {ResultType} from "../ResultType";

export function isResultBaseObject(value: unknown): value is IResultBase {
    return value !== null
        && value instanceof ResultBase
        && Object.values(ResultType).includes(value.type);
}
