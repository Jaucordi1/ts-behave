import {describe, it, expect} from "@jest/globals";
import {ResultBase} from "../../../results";
import {executeMappedFunctionsAsync} from "./executeMappedFunctionsAsync";

describe("executeMappedFunctionsAsync", () => {

    it("should execute without throwing", () => {
        expect.assertions(1);
        const test = () => executeMappedFunctionsAsync({
            hello: [
                async () => "Hello World!" as const,
            ],
            balance: [
                async (amount: number) => `Your current balance is ${amount}` as const,
                100,
            ],
        });
        expect(test).not.toThrow();
    });

    it("should return a valid promise of awaited result objects mapping", () => {
        expect.assertions(5);

        const results = executeMappedFunctionsAsync({
            hello: [async () => "Hello World!" as const],
            balance: [
                async (amount: number) => `Your current balance is ${amount}` as const,
                100,
            ] as const,
        });

        expect(results.then(obj => Object.keys(obj))).resolves.toHaveLength(2);

        expect(results).resolves.toHaveProperty("hello");
        expect(results.then(({hello}) => hello)).resolves.toBeInstanceOf(ResultBase);

        expect(results).resolves.toHaveProperty("balance");
        expect(results.then(({balance}) => balance)).resolves.toBeInstanceOf(ResultBase);
    });

});
