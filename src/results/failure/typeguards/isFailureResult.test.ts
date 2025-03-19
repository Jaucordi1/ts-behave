import {describe, expect, it} from "@jest/globals";

import type {IResult} from "../../IResult";
import {SuccessResult} from "../../success";
import {FailureResult} from "../FailureResult";
import {isFailureResult} from "./isFailureResult";

describe("isFailureResult", () => {

    it("should returns TRUE for a failure result object", () => {
        const error = new Error("test OK");
        const result = new FailureResult(error);
        expect(isFailureResult(result)).toBe(true);
    });

    it("should returns FALSE for a success result object", () => {
        const data = "I have been returned by the StringTestAction execution." as const;
        const result = new SuccessResult(data) as IResult<typeof data>;
        expect(isFailureResult(result)).toBe(false);
    });

});
