import {describe, expect, it} from "@jest/globals";
import {FailureResult} from "./FailureResult";

describe("FailureResult class", () => {
    it("should create a FailureResult instance without throwing", () => {
        const error = new Error("Test FAILED");
        const test = () => new FailureResult(error);
        expect(test).not.toThrow();
    });

    it("should create a valid FailureResult instance", () => {
        const error = new Error("Test FAILED");
        const result = new FailureResult(error);
        expect(result).toHaveProperty("type", "failure");
        expect(result).toHaveProperty("error", error);
    });
});
