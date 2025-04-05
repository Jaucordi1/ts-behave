import {describe, expect, it} from "@jest/globals";
import {FailureResult, IFailureResult, IResult, SuccessResult} from "../../../results";
import {executeSequenceFunctionsSync} from "./executeSequenceFunctionsSync";

describe("executeSequenceFunctionsSync", () => {

    it("should execute without throwing", () => {
        expect.assertions(1);

        const newTest = () => executeSequenceFunctionsSync(
            (name: string) => `Hello ${name}!` as const, "John",
            async (prev: IResult<`Hello ${string}!`>): Promise<string> => {
                throw prev.type === "failure" ? prev.error : new Error(prev.data);
            },
        );

        expect(newTest).not.toThrow();
    });

    it("should return a valid results tuple for given functions", () => {
        expect.assertions(5);

        const results = executeSequenceFunctionsSync(
            (name: string) => `Hello ${name}!` as const, "John",
            async (prev: IResult<`Hello ${string}!`>): Promise<string> => {
                throw prev.type === "failure" ? prev.error : new Error(prev.data);
            },
        );

        expect(results).toHaveLength(2);
        const [first, second] = results;

        expect(first).toBeInstanceOf(SuccessResult);
        expect(first).toHaveProperty("data", "Hello John!");

        expect(second).resolves.toBeInstanceOf(FailureResult);
        expect(second.then(failure => (failure as IFailureResult<Error>).error)).resolves.toBeInstanceOf(Error);
    });

});
