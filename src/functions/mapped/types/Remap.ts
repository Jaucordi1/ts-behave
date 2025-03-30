export type Remap<
    T extends Record<TName, TValue>,
    TName extends PropertyKey = keyof T,
    TValue = T[TName],
> = {
    [Key in TName]: T[Key];
};
