import {describe, it, expect} from "@jest/globals";
import * as path from "node:path";
import tsd from "tsd";

describe("Typings Tests", () => {
    it("should not compile if not strongly-typed", async () => {
        expect.assertions(1);
        const root = path.resolve(__dirname, "../");
        const diagnostics = await tsd({
            cwd: root,
            typingsFile: "dist/index.d.ts",
            testFiles: ["./src/**/*.test-d.ts"],
        });
        expect(diagnostics).toStrictEqual([]);
    });
});
