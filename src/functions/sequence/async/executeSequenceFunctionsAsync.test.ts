import {describe, expect, it} from "@jest/globals";
import {FailureResult, IFailureResult, IResult, SuccessResult} from "../../../results";
import {executeSequenceFunctionsAsync} from "./executeSequenceFunctionsAsync";

describe("executeSequenceFunctionsAsync", () => {

    it("should execute without throwing", () => {
        expect.assertions(1);

        const test = () => executeSequenceFunctionsAsync(
            (name: string) => `Hello ${name}!` as const, "John",
            async (prev: IResult<`Hello ${string}!`>): Promise<string> => {
                throw prev.type === "failure" ? prev.error : new Error(prev.data);
            },
        );

        expect(test).not.toThrow();
    });

    it("should return a valid results tuple for given functions", async () => {
        expect.assertions(5);

        const results = await executeSequenceFunctionsAsync(
            (name: string) => `Hello ${name}!` as const, "John",
            async (prev: IResult<`Hello ${string}!`>): Promise<string> => {
                throw prev.type === "failure" ? prev.error : new Error(prev.data);
            },
        );

        expect(results).toHaveLength(2);
        const [first, second] = results;

        expect(first).toBeInstanceOf(SuccessResult);
        expect(first).toHaveProperty("data", "Hello John!");

        expect(second).toBeInstanceOf(FailureResult);
        expect((second as IFailureResult<Error>).error).toBeInstanceOf(Error);
    });

});
