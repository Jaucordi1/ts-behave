import {describe, expect, it} from "@jest/globals";
import {FailureResult, SuccessResult} from "../../../results";
import {executeMultipleFunctionsSync} from "./executeMultipleFunctionsSync";

describe("executeMultipleFunctionsSync", () => {

    it("should execute without throwing", () => {
        expect.assertions(1);
        const test = () => executeMultipleFunctionsSync(
            (): string => {
                throw new Error("Nope :/");
            },
            (): number => {
                throw new Error("Nope 2 :/");
            },
        );
        expect(test).not.toThrow();
    });

    it("should returns a valid result objects tuple", () => {
        expect.assertions(5);

        const data = 250 as const;
        const error = new Error("Nope :/");
        const results = executeMultipleFunctionsSync(
            (): string => {
                throw error;
            },
            (): number => data,
        );

        expect(results).toHaveLength(2);
        const [first, second] = results;

        expect(first).toBeInstanceOf(FailureResult);
        expect(first).toHaveProperty("error", error);

        expect(second).toBeInstanceOf(SuccessResult);
        expect(second).toHaveProperty("data", data);
    });

});
