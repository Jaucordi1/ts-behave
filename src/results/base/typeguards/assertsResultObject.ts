import {ExpectedResultBaseObjectError} from "../../errors";
import type {IResultBase} from "../IResultBase";
import {isResultBaseObject} from "./isResultBaseObject";

export function assertsResultObject(value: unknown): asserts value is IResultBase {
    if (!isResultBaseObject(value)) {
        throw new ExpectedResultBaseObjectError(value);
    }
}
