import {describe, expect, it} from "@jest/globals";
import {UnexpectedResultTypeError} from "../../errors";
import {FailureResult} from "../../failure";
import type {IResult} from "../../IResult";
import {assertsSuccessResult} from "./assertsSuccessResult";

describe("assertSuccess", () => {

    it("should throw an error for a failure result object", () => {
        const error = new Error("test OK");
        const result = new FailureResult(error) as IResult<any, typeof error>;
        const test = () => assertsSuccessResult(result);
        expect(test).toThrow(UnexpectedResultTypeError);
    });

});
