/**
 * Add {@link TItem|item} at the end of a {@link TList|list}, start by default with an empty array.
 *
 * @template {any} TItem
 * @template {any[]} TList
 */
export type AddItemAtListEnd<TItem, TList extends any[] = []> =
    [...TList, TItem];

/**
 * Add {@link TItem|item} at the beginning of a {@link TList|list}, start by default with an empty array.
 *
 * @template {any} TItem
 * @template {any[]} TList
 */
export type AddItemAtListStart<TItem, TList extends any[] = []> =
    [TItem, ...TList];

/**
 * Remove last item in given list, keeping the tuples specificity.
 */
export type RemoveLastListItem<TList extends any[] = []> =
    TList extends [] ? [] :
        TList extends [...infer First, infer Last extends any]
            ? [...First]
            : [];

/**
 * Remove first item in given list, keeping the tuples specificity.
 */
export type RemoveFirstListItem<TList extends any[] = []> =
    TList extends [] ? [] :
        TList extends [infer First extends any, ...infer Next]
            ? [...Next]
            : [];

export type GetFirstListItem<TList extends any[] = []> = TList[0];

export type GetLastListItem<TList extends any[] = []> =
    TList extends [] ? never :
        TList extends [...infer TFirstItems, infer TLastItem] ?
            TLastItem :
            never;
