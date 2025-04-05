const {createDefaultPreset} = require("ts-jest");

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    ...createDefaultPreset(),
    verbose: true,
    testEnvironment: "node",
    roots: ['./src/'],
    transform: {
        "^.+.tsx?$": ["ts-jest", {
            tsconfig: "./tsconfig-tests.json",
        }],
    },
    coverageDirectory: "./coverage/",
};
