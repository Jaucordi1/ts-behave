import type {IResultBase} from "../IResultBase";
import {ExpectedResultBaseObjectError} from "../../errors/ExpectedResultBaseObjectError";
import {isResultBaseObject} from "./isResultBaseObject";

export function assertsResultObject(value: unknown): asserts value is IResultBase {
    if (!isResultBaseObject(value)) {
        throw new ExpectedResultBaseObjectError(value);
    }
}
