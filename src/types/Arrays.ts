type TuplePlacements = {
    0: "first";
    1: "second";
    2: "third";
    3: "fourth";
    4: "fifth";
    5: "sixth";
    6: "seventh";
    7: "eighth";
    8: "ninth";
    9: "tenth";
};

export type TuplePlacementNumber<
    N extends number,
> = N extends keyof TuplePlacements & number
    ? TuplePlacements[N]
    : `#${N}`;

export type TupleSize<
    TArr extends any[] | ReadonlyArray<any>,
> = [...TArr] extends { length: infer TSize extends number }
    ? TSize
    : never;

export type TupleSizeWithOffset<
    TArr extends any[],
    TOffset extends any[]
        = [],
> = TupleSize<[...TOffset, ...TArr]>;

/**
 * Flatten a given array
 */
export type FlatArray<
    TArray extends any[],
    TFlatten extends any[]
        = [],
> = TArray extends [] ? TFlatten :
    TArray extends [infer First, ...infer Rest]
        ? First extends any[]
            ? FlatArray<
                Rest,
                [...TFlatten, ...FlatArray<First>]
            >
            : FlatArray<
                Rest,
                [...TFlatten, First]
            >
        : never;
