/**
 * Result object's types enum at run-time.
 */
export const ResultType = Object.freeze({
    SUCCESS: "success",
    FAILURE: "failure",
} as const);

/**
 * Result object's types enum at compile-time.
 */
export type ResultType
    = typeof ResultType;

/**
 * Union of each left-side (keys) in the result object's types enum.
 */
export type ResultTypeName
    = keyof ResultType;

/**
 * Union of each right-side (values) in the result object's types enum.
 */
export type ResultTypeValue = ResultType[ResultTypeName];
