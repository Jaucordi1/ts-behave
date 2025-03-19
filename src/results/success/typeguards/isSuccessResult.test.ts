import {describe, expect, it} from "@jest/globals";

import type {IResult} from "../../IResult";
import {FailureResult} from "../../failure";
import {SuccessResult} from "../index";
import {isSuccessResult} from "./isSuccessResult";

describe("isSuccessResult", () => {
    it("should returns TRUE for a success result object", () => {
        const data = "I have been returned by the StringTestAction execution." as const;
        const result = new SuccessResult(data);
        expect(isSuccessResult(result)).toBe(true);
    });

    it("should returns FALSE for a failure result object", () => {
        const error = new Error("test OK");
        const result = new FailureResult(error) as IResult<any, typeof error>;
        expect(isSuccessResult(result)).toBe(false);
    });
});
