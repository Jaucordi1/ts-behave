import {describe, expect, it} from "@jest/globals";
import {FailureResult, SuccessResult} from "../../../results";
import {executeMultipleFunctionsAsync} from "./executeMultipleFunctionsAsync";

describe("executeMultipleFunctionsAsync", () => {

    it("should execute without throwing or rejecting", () => {
        expect.assertions(2);
        const test = () => executeMultipleFunctionsAsync(
            async (): Promise<string> => {
                throw new Error("Nope :/");
            },
            async (): Promise<number> => {
                throw new Error("Nope 2 :/");
            },
        );
        expect(test).not.toThrow();
        expect(test()).resolves.not.toThrow();
    });

    it("should return a promise of a valid result objects tuple", async () => {
        expect.assertions(5);

        const data = 250 as const;
        const error = new Error("Nope :/");
        const results = await executeMultipleFunctionsAsync(
            async (): Promise<string> => {
                throw error;
            },
            async (): Promise<250> => Promise.resolve(data),
        );

        expect(results).toHaveLength(2);
        const [first, second] = results;

        expect(first).toBeInstanceOf(FailureResult);
        expect(first).toHaveProperty("error", error);

        expect(second).toBeInstanceOf(SuccessResult);
        expect(second).toHaveProperty("data", data);
    });

});
