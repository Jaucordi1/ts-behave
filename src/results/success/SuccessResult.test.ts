import {describe, expect, it} from "@jest/globals";
import {SuccessResult} from "./SuccessResult";

describe("SuccessResult class", () => {

    it("should create a SuccessResult instance without throwing", () => {
        const test = () => new SuccessResult("Test OK");
        expect(test).not.toThrow();
    });

    it("should create a valid SuccessResult instance", () => {
        const data = "Test OK";
        const result = new SuccessResult(data);
        expect(result).toHaveProperty("type", "success");
        expect(result).toHaveProperty("data", data);
    });

});
