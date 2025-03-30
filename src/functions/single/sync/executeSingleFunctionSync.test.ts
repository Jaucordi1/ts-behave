import {describe, expect, it} from "@jest/globals";
import {FailureResult, SuccessResult} from "../../../results";
import {executeSingleFunctionSync} from "./executeSingleFunctionSync";

describe("executeSingleFunctionSync", () => {

    describe("Sync Functions", () => {
        it("should execute without throwing", () => {
            expect.assertions(1);
            const test = () => executeSingleFunctionSync(() => "");
            expect(test).not.toThrow();
        });

        it("should return a valid success result object for the given function", () => {
            expect.assertions(2);
            const data = "ok" as const;
            const funcToExecute = (): typeof data => data;
            const result = executeSingleFunctionSync(funcToExecute);
            expect(result).toBeInstanceOf(SuccessResult);
            expect(result).toHaveProperty("data", data);
        });

        it("should handle thrown errors gracefully", () => {
            expect.assertions(1);
            const funcToExecute = (): string => {
                throw new Error();
            };
            const test = () => executeSingleFunctionSync(funcToExecute);
            expect(test).not.toThrow();
        });

        it("should return a valid failure result object for the given function", () => {
            expect.assertions(2);
            const error = new Error("Nope");
            const funcToExecute = (): string => {
                throw error;
            };
            const result = executeSingleFunctionSync(funcToExecute);
            expect(result).toBeInstanceOf(FailureResult);
            expect(result).toHaveProperty("error", error);
        });
    });

    describe("Async Functions", () => {
        it("should execute without throwing", () => {
            expect.assertions(1);
            const test = () => executeSingleFunctionSync(async () => Promise.resolve(""));
            expect(test).not.toThrow();
        });

        it("should return a valid success result object for the given function", () => {
            expect.assertions(2);
            const data = "ok" as const;
            const funcToExecute = async (): Promise<typeof data> => Promise.resolve(data);
            const result = executeSingleFunctionSync(funcToExecute);
            expect(result).resolves.toBeInstanceOf(SuccessResult);
            expect(result).resolves.toHaveProperty("data", data);
        });

        it("should handle thrown errors gracefully", () => {
            expect.assertions(1);
            const funcToExecute = async (): Promise<string> => {
                throw new Error();
            };
            const test = () => executeSingleFunctionSync(funcToExecute);
            expect(test).not.toThrow();
        });

        it("should return a valid failure result object for the given function", () => {
            expect.assertions(2);
            const error = new Error("Nope");
            const funcToExecute = async (): Promise<string> => {
                throw error;
            };
            const result = executeSingleFunctionSync(funcToExecute);
            expect(result).resolves.toBeInstanceOf(FailureResult);
            expect(result).resolves.toHaveProperty("error", error);
        });
    });

});
