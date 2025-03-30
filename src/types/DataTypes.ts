/**
 * Create a constant, at **runtime**, containing the result of a `typeof …` statement.
 */
const RuntimeTypeOf = typeof '';

/**
 * Get an union type of each possible {@link RuntimeTypeOf|string returned by a runtime `typeof …` statement}.
 */
export type TypeOf = typeof RuntimeTypeOf;

const RuntimeTypeOfTuple = [
    "number",
    "string",
    "boolean",
    "function",
    "object",
    "undefined",
    "bigint",
    "symbol",
] as const satisfies TypeOf[];
type TypeOfTuple = typeof RuntimeTypeOfTuple;

/**
 * Create a runtime object satisfying a record of TypeOf keys and any value.\
 * It forces you to define a key/value pair for any string returned by a "typeof" statement.
 */
const TypeOfInferFunctions = {
    number: (value: unknown): value is number => typeof value === "number",
    string: (value: unknown): value is string => typeof value === "string",
    boolean: (value: unknown): value is boolean => typeof value === "boolean",
    function: (value: unknown): value is (...args: any[]) => any => typeof value === "function",
    object: (value: unknown): value is object => value !== null && typeof value === "object",
    undefined: (value: unknown): value is undefined => typeof value === "undefined",
    bigint: (value: unknown): value is bigint => typeof value === "bigint",
    symbol: (value: unknown): value is symbol => typeof value === "symbol",
} satisfies Record<TypeOf, (value: unknown) => value is any>;

/**
 * This creates the compile-time mapping "typeof" string with its corresponding type.
 */
type TypeOfInferFunctions = typeof TypeOfInferFunctions;
type TypeOfMapping = Exclude<{
    [TType in keyof TypeOfInferFunctions]:
        TypeOfInferFunctions[TType] extends (value: unknown) => value is infer TInferredType
            ? TInferredType
            : {__BRAND__: 'NEVER'};
}, Record<keyof TypeOfInferFunctions, {__BRAND__: 'NEVER'}>>;
export type TypeOfTypeOf<T extends TypeOf> = TypeOfMapping[T];

/**
 * This magical type makes a ping-pong with the typeof mapping to\
 * retrieve the less-specific type corresponding to the given one.
 */
export type GetTypeOf<
    T,
    TAcc extends ReadonlyArray<TypeOf>
        = TypeOfTuple,
> = TAcc extends [] ? "Given type isn't supported!" :
    TAcc extends [infer TCandidate extends TypeOf, ...infer Rest extends TypeOf[]]
        ? T extends TypeOfTypeOf<TCandidate>
            ? TypeOfTypeOf<TCandidate>
            : GetTypeOf<T, Rest>
        : `Incompatible given type!`;

export type TypeOfOfType<
    T,
    TAcc extends TypeOf[]
        = TypeOfTuple,
> = TAcc extends [] ? "Given type isn't supported!" :
    TAcc extends [infer TCandidateTypeOf extends TypeOf, ...infer Rest extends TypeOf[]]
        ? GetTypeOf<T> extends TypeOfTypeOf<TCandidateTypeOf>
            ? TCandidateTypeOf
            : TypeOfOfType<T, Rest>
        : never;

export function getTypeOf<T>(arg: T): TypeOfOfType<T> {
    return typeof arg as TypeOfOfType<T>;
}
