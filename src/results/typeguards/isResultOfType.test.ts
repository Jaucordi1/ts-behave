import {describe, expect, it} from "@jest/globals";

import type {IResult} from "../IResult";
import {FailureResult} from "../failure";
import {SuccessResult} from "../success";
import {isResultOfType} from "./isResultOfType";

describe("Result TypeGuard - Type assertions", () => {

    it("should execute without throwing", () => {
        const data = "I have been returned by the StringTestAction execution." as const;
        const result = new SuccessResult(data) as IResult<typeof data>;
        const execution = () => isResultOfType(result, "failure");
        expect(execution).not.toThrow();
    });

    it("should returns TRUE for a success result object when asking for 'success' type", () => {
        const data = "I have been returned by the StringTestAction execution." as const;
        const result = new SuccessResult(data) as IResult<typeof data>;
        expect(isResultOfType(result, "success")).toBe(true);
    });

    it("should returns FALSE for a failure result object when asking for 'success' type", () => {
        const error = new Error("test OK");
        const result = new FailureResult(error) as IResult<any, typeof error>;
        expect(isResultOfType(result, "success")).toBe(false);
    });

    it("should returns TRUE for a failure result object when asking for 'failure' type", () => {
        const error = new Error("test OK");
        const result = new FailureResult(error);
        expect(isResultOfType(result, "failure")).toBe(true);
    });

    it("should returns FALSE for a success result object when asking for 'failure' type", () => {
        const data = "I have been returned by the StringTestAction execution." as const;
        const result = new SuccessResult(data) as IResult<typeof data>;
        expect(isResultOfType(result, "failure")).toBe(false);
    });

});
