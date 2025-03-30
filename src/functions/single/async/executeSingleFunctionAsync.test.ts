import {describe, expect, it} from "@jest/globals";
import {FailureResult, SuccessResult} from "../../../results";
import {executeSingleFunctionAsync} from "./executeSingleFunctionAsync";

describe("executeSingleFunctionAsync", () => {

    describe("Async Functions", () => {
        it("should execute without throwing", () => {
            expect.assertions(1);
            const test = () => executeSingleFunctionAsync(async () => "");
            expect(test).not.toThrow();
        });

        it("should return a valid success result object for the given function", () => {
            expect.assertions(2);
            const data = "ok" as const;
            const funcToExecute = async (): Promise<typeof data> => data;
            const result = executeSingleFunctionAsync(funcToExecute);
            expect(result).resolves.toBeInstanceOf(SuccessResult);
            expect(result).resolves.toHaveProperty("data", data);
        });

        it("should handle thrown errors gracefully", () => {
            expect.assertions(1);
            const funcToExecute = async (): Promise<string> => {
                throw new Error();
            };
            const test = () => executeSingleFunctionAsync(funcToExecute);
            expect(test).not.toThrow();
        });

        it("should return a valid failure result object for the given function", () => {
            expect.assertions(2);
            const error = new Error("Nope");
            const funcToExecute = async (): Promise<string> => {
                throw error;
            };
            const result = executeSingleFunctionAsync(funcToExecute);
            expect(result).resolves.toBeInstanceOf(FailureResult);
            expect(result).resolves.toHaveProperty("error", error);
        });
    });

});
