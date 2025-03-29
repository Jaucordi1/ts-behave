import type {ValidateCompatibleArguments} from "../../arguments.types";

/**
 * Type qui vérifie que le tuple T est une séquence d'exécution de fonctions valide.
 */
export type ValidateFunctionsExecutions<
    T extends any[],
    TAcc extends any[]
        = T,
    TValidFunctions extends ((...args: any[]) => any)[]
        = [],
    TValidArgs extends any[]
        = [],
> = TAcc extends [] ? TValidArgs :
    TAcc extends [infer TFunc, ...infer Rest]
        ? TFunc extends (...args: infer TExpectedParams) => any
            ? Rest extends [...TExpectedParams, ...infer Next]
                ? ValidateFunctionsExecutions<
                    // Pass original received arguments
                    T,
                    // Pass remaining tuple after function execution arguments
                    Next,
                    // Add to valid functions
                    [...TValidFunctions, TFunc],
                    // Add to valid arguments
                    [...TValidArgs, TFunc, ...TExpectedParams]
                >
                : ValidateCompatibleArguments<TExpectedParams, Rest, [...TValidArgs, TFunc]> extends Rest
                    ? [TFunc, ...Rest]
                    : ValidateCompatibleArguments<TExpectedParams, Rest, [...TValidArgs, TFunc]>
            : never
        : never;
