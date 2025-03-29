/**
 * Represents the intersection of every type in given union.
 */
export type UnionToIntersection<U> =
    (U extends any ? (x: U) => void : never) extends
        ((x: infer I) => void) ? I : never;
