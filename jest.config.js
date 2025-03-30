const {createDefaultPreset} = require("ts-jest");

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    ...createDefaultPreset(),
    verbose: true,
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest", {
            tsconfig: "./tsconfig-tests.json",
        }],
    },
    coverageDirectory: "./coverage/",
};
