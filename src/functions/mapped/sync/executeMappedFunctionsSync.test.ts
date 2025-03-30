import {describe, it, expect} from "@jest/globals";
import {ResultBase} from "../../../results";
import {executeMappedFunctionsSync} from "./executeMappedFunctionsSync";

describe("executeMappedFunctionsSync", () => {

    it("should execute without throwing", () => {
        expect.assertions(1);
        const test = () => executeMappedFunctionsSync({
            hello: [() => "Hello World!" as const],
            balance: [(amount: number) => `Your current balance is ${amount}` as const, 100],
        });
        expect(test).not.toThrow();
    });

    it("should return valid result objects mapping", () => {
        expect.assertions(5);

        const results = executeMappedFunctionsSync({
            hello: [() => "Hello World!" as const],
            balance: [
                (amount: number) => `Your current balance is ${amount}` as const,
                100,
            ] as const,
        });

        expect(Object.keys(results)).toHaveLength(2);

        expect(results).toHaveProperty("hello");
        expect(results.hello).toBeInstanceOf(ResultBase);

        expect(results).toHaveProperty("balance");
        expect(results.balance).toBeInstanceOf(ResultBase);
    });

    it("should have promise of result for given asynchronous functions", () => {
        expect.assertions(2);

        const results = executeMappedFunctionsSync({
            hello: [async () => "Hello World!" as const],
            balance: [
                (amount: number) => `Your current balance is ${amount}` as const,
                100,
            ] as const,
        });

        expect(results.hello).resolves.toBeInstanceOf(ResultBase);
        expect(results.balance).toBeInstanceOf(ResultBase);
    });

});
